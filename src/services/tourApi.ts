const BASE_URL = import.meta.env.DEV
  ? '/tourapi'
  : ''

const keywordCache = new Map<string, TourPlace[]>()
const keywordRequests = new Map<string, Promise<TourPlace[]>>()
const keywordBatchRequests = new Map<string, Promise<TourPlace[][]>>()
let tourApiQueue = Promise.resolve()
const storageCacheKey = 'rural-tour-api-keyword-cache-v1'

export class TourApiQuotaError extends Error {
  constructor() {
    super('TourAPI token quota exceeded')
    this.name = 'TourApiQuotaError'
  }
}

export interface TourPlace {
  id: string
  title: string
  address: string
  lat: number
  lng: number
  image?: string
  contentTypeId?: string
  source: 'api' | 'fallback'
}

type UnknownRecord = Record<string, unknown>

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === 'object' && value !== null
}

function getString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined
}

function normalizeItems(value: unknown): UnknownRecord[] {
  if (Array.isArray(value)) {
    return value.filter(isRecord)
  }

  return isRecord(value) ? [value] : []
}

function isTourPlace(value: unknown): value is TourPlace {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.address === 'string' &&
    typeof value.lat === 'number' &&
    Number.isFinite(value.lat) &&
    typeof value.lng === 'number' &&
    Number.isFinite(value.lng) &&
    value.source === 'api'
  )
}

function readStoredKeywordCache() {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const storedValue = window.localStorage.getItem(storageCacheKey)
    const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : {}

    if (!isRecord(parsedValue)) {
      return {}
    }

    return Object.fromEntries(
      Object.entries(parsedValue).filter((entry): entry is [string, TourPlace[]] => {
        const [, value] = entry
        return Array.isArray(value) && value.every(isTourPlace)
      }),
    )
  } catch {
    return {}
  }
}

function writeStoredKeywordCache(keyword: string, places: TourPlace[]) {
  if (typeof window === 'undefined' || places.length === 0) {
    return
  }

  try {
    const storedCache = readStoredKeywordCache()
    storedCache[keyword] = places
    window.localStorage.setItem(storageCacheKey, JSON.stringify(storedCache))
  } catch {
    // Storage is only an optimization. Ignore private-mode or quota failures.
  }
}

function getStoredKeywordPlaces(keyword: string) {
  const storedPlaces = readStoredKeywordCache()[keyword]

  if (storedPlaces) {
    keywordCache.set(keyword, storedPlaces)
  }

  return storedPlaces
}

function toTourPlace(item: UnknownRecord): TourPlace | null {
  const title = getString(item.title)
  const mapx = getString(item.mapx)
  const mapy = getString(item.mapy)

  if (!title || !mapx || !mapy) {
    return null
  }

  const lng = Number(mapx)
  const lat = Number(mapy)

  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return null
  }

  const addr1 = getString(item.addr1)
  const addr2 = getString(item.addr2)
  const address = [addr1, addr2].filter(Boolean).join(' ') || '주소 정보 없음'
  const contentId = getString(item.contentid)
  const contentTypeId = getString(item.contenttypeid)
  const image = getString(item.firstimage) ?? getString(item.firstimage2)

  return {
    id: contentId ?? `${title}-${lat}-${lng}`,
    title,
    address,
    lat,
    lng,
    image,
    contentTypeId,
    source: 'api',
  }
}

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds))
}

function fetchQueued(url: string) {
  const request = tourApiQueue.then(async () => {
    const response = await fetch(url)
    await wait(850)
    return response
  })

  tourApiQueue = request.then(
    () => undefined,
    () => undefined,
  )

  return request
}

async function fetchTourPlacesByKeyword(keyword: string): Promise<TourPlace[]> {
  if (!BASE_URL) {
    return []
  }

  const params = new URLSearchParams({
    MobileOS: 'ETC',
    MobileApp: 'rural-dashboard',
    _type: 'json',
    numOfRows: '10',
    pageNo: '1',
    arrange: 'A',
    keyword,
  })

  try {
    const response = await fetchQueued(`${BASE_URL}/searchKeyword2?${params.toString()}`)

    if (response.status === 429) {
      throw new TourApiQuotaError()
    }

    if (!response.ok) {
      return []
    }

    const data: unknown = await response.json()

    if (!isRecord(data) || !isRecord(data.response) || !isRecord(data.response.body)) {
      return []
    }

    const items = isRecord(data.response.body.items) ? data.response.body.items.item : undefined

    return normalizeItems(items)
      .map(toTourPlace)
      .filter((place): place is TourPlace => place !== null)
  } catch (error) {
    if (error instanceof TourApiQuotaError) {
      throw error
    }

    return []
  }
}

export async function searchTourPlacesByKeyword(keyword: string): Promise<TourPlace[]> {
  const normalizedKeyword = keyword.trim()

  if (!normalizedKeyword) {
    return []
  }

  const cachedPlaces = keywordCache.get(normalizedKeyword)

  if (cachedPlaces) {
    return cachedPlaces
  }

  const storedPlaces = getStoredKeywordPlaces(normalizedKeyword)

  if (storedPlaces) {
    return storedPlaces
  }

  const pendingRequest = keywordRequests.get(normalizedKeyword)

  if (pendingRequest) {
    return pendingRequest
  }

  const request = fetchTourPlacesByKeyword(normalizedKeyword).then((places) => {
    keywordCache.set(normalizedKeyword, places)
    writeStoredKeywordCache(normalizedKeyword, places)
    keywordRequests.delete(normalizedKeyword)
    return places
  })

  keywordRequests.set(normalizedKeyword, request)
  return request
}

export async function searchTourPlacesByKeywords(keywords: readonly string[]): Promise<TourPlace[][]> {
  const normalizedKeywords = keywords.map((keyword) => keyword.trim()).filter(Boolean)
  const batchKey = normalizedKeywords.join('|')
  const pendingBatchRequest = keywordBatchRequests.get(batchKey)

  if (pendingBatchRequest) {
    return pendingBatchRequest
  }

  const request = (async () => {
    const results: TourPlace[][] = []

    for (const keyword of normalizedKeywords) {
      results.push(await searchTourPlacesByKeyword(keyword))
    }

    return results
  })().finally(() => {
    keywordBatchRequests.delete(batchKey)
  })

  keywordBatchRequests.set(batchKey, request)
  return request
}

const BASE_URL = import.meta.env.DEV
  ? '/tourapi'
  : 'https://apis.data.go.kr/B551011/KorService2'

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

export async function searchTourPlacesByKeyword(keyword: string): Promise<TourPlace[]> {
  const serviceKey = getString(import.meta.env.VITE_TOUR_API_KEY)

  if (!serviceKey) {
    return []
  }

  const params = new URLSearchParams({
    serviceKey,
    MobileOS: 'ETC',
    MobileApp: 'rural-dashboard',
    _type: 'json',
    numOfRows: '10',
    pageNo: '1',
    arrange: 'A',
    keyword,
  })

  try {
    const response = await fetch(`${BASE_URL}/searchKeyword2?${params.toString()}`)

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
  } catch {
    return []
  }
}

import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { TextDecoder } from 'node:util'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')
const rawDir = process.env.WORKATION_RAW_DIR
  ? path.resolve(process.env.WORKATION_RAW_DIR)
  : path.join(projectRoot, 'public', 'data', 'raw', 'workation')
const outputPath = path.join(projectRoot, 'public', 'data', 'workation-spaces.json')

const datasetNames = {
  hadongEmptyHouse: '경상남도 하동군_빈집정보',
  guryeEmptyHouseStats: '전라남도_시군별 빈집 현황',
  closedSchool: '폐교재산 현황',
  experienceVillage: '전국농어촌체험휴양마을표준데이터',
}

const approximateCoordinates = [
  { keyword: '화개', lat: 35.1897, lng: 127.6255 },
  { keyword: '악양', lat: 35.1605, lng: 127.6865 },
  { keyword: '하동읍', lat: 35.067, lng: 127.751 },
  { keyword: '하동', lat: 35.19, lng: 127.68 },
  { keyword: '산동', lat: 35.314, lng: 127.462 },
  { keyword: '마산', lat: 35.257, lng: 127.497 },
  { keyword: '구례읍', lat: 35.2025, lng: 127.4622 },
  { keyword: '구례', lat: 35.2025, lng: 127.4622 },
]

function normalizeHeader(value) {
  return String(value ?? '').replace(/\s|_|-|\.|\(|\)|\[|\]/g, '').toLowerCase()
}

function koreanSignalScore(text) {
  const signals = ['시군', '소재지', '주소', '빈집', '폐교', '체험', '위도', '경도', '하동', '구례']
  const replacementCount = (text.match(/\uFFFD/g) ?? []).length
  const signalCount = signals.reduce((score, signal) => score + (text.includes(signal) ? 1 : 0), 0)

  return signalCount * 10 - replacementCount
}

function decodeKoreanText(buffer) {
  const utf8 = new TextDecoder('utf-8', { fatal: false }).decode(buffer)

  try {
    const eucKr = new TextDecoder('euc-kr', { fatal: false }).decode(buffer)
    return koreanSignalScore(eucKr) > koreanSignalScore(utf8) ? eucKr : utf8
  } catch {
    return utf8
  }
}

function parseCsv(text) {
  const rows = []
  let row = []
  let cell = ''
  let inQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const nextChar = text[index + 1]

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"'
      index += 1
      continue
    }

    if (char === '"') {
      inQuotes = !inQuotes
      continue
    }

    if (char === ',' && !inQuotes) {
      row.push(cell)
      cell = ''
      continue
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1
      }

      row.push(cell)
      if (row.some((value) => value.trim().length > 0)) {
        rows.push(row)
      }
      row = []
      cell = ''
      continue
    }

    cell += char
  }

  row.push(cell)
  if (row.some((value) => value.trim().length > 0)) {
    rows.push(row)
  }

  const [headers = [], ...bodyRows] = rows
  return bodyRows.map((values) => {
    return Object.fromEntries(headers.map((header, index) => [String(header).trim(), values[index]?.trim() ?? '']))
  })
}

async function readExcelRows(filePath) {
  try {
    const xlsxModule = await import('xlsx')
    const xlsx = xlsxModule.default ?? xlsxModule
    const workbook = xlsx.readFile(filePath)
    const firstSheet = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[firstSheet]
    const rows = xlsx.utils.sheet_to_json(worksheet, { defval: '' })
    const arrayRows = xlsx.utils.sheet_to_json(worksheet, { header: 1, defval: '' })
    const closedSchoolRows = normalizeClosedSchoolSheetRows(arrayRows)

    return closedSchoolRows.length > 0 ? closedSchoolRows : rows
  } catch {
    console.warn(`[workation-data] Skipping ${path.basename(filePath)}. Install "xlsx" to read XLS/XLSX files.`)
    return []
  }
}

function normalizeClosedSchoolSheetRows(rows) {
  const headerIndex = rows.findIndex((row) => {
    const rowText = row.join(' ')
    return rowText.includes('지역청') && rowText.includes('폐교명') && rowText.includes('폐교일자')
  })

  if (headerIndex < 0) {
    return []
  }

  return rows.slice(headerIndex + 2).flatMap((row) => {
    const serial = row[0]
    const regionOffice = String(row[1] ?? '').trim()
    const closedSchoolName = String(row[2] ?? '').trim()
    const county = String(row[5] ?? '').trim()
    const town = String(row[6] ?? '').trim()
    const restAddress = String(row[7] ?? '').trim()

    if (!serial || !closedSchoolName || !county) {
      return []
    }

    return [
      {
        지역청: regionOffice,
        폐교명: closedSchoolName,
        급별: row[3],
        폐교일자: row[4],
        주소: [county, town, restAddress].filter(Boolean).join(' '),
        건물: row[8],
        토지: row[9],
        현재상태: row[10],
        향후계획: row[11],
        도서벽지여부: row[12],
      },
    ]
  })
}

async function readTable(filePath) {
  const extension = path.extname(filePath).toLowerCase()

  if (extension === '.csv') {
    return parseCsv(decodeKoreanText(await readFile(filePath)))
  }

  if (extension === '.xls' || extension === '.xlsx') {
    return readExcelRows(filePath)
  }

  return []
}

function getField(row, candidates) {
  const entries = Object.entries(row).map(([key, value]) => [normalizeHeader(key), value])

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeHeader(candidate)
    const match = entries.find(([key]) => key.includes(normalizedCandidate))

    if (match && String(match[1]).trim()) {
      return String(match[1]).trim()
    }
  }

  return ''
}

function parseNumber(value) {
  const normalized = String(value ?? '').replace(/,/g, '').match(/-?\d+(\.\d+)?/)
  return normalized ? Number(normalized[0]) : undefined
}

function parseBooleanAvailability(value) {
  const normalized = String(value ?? '').trim().toLowerCase()
  if (!normalized) {
    return undefined
  }

  return ['y', 'yes', 'true', '1', '동의', '가능', '공개'].some((signal) => normalized.includes(signal))
}

function detectRegion(row, fallback = '') {
  const target = [
    getField(row, ['시군명', '시군', '군명', '지역', '소재지', '주소', '도로명주소', '지번주소']),
    fallback,
  ].join(' ')

  if (target.includes('구례')) {
    return '구례'
  }

  if (target.includes('하동')) {
    return '하동'
  }

  return undefined
}

function maskAddress(address, region) {
  const tokens = String(address ?? '').split(/\s+/).filter(Boolean)
  const countyIndex = tokens.findIndex((token) => token.endsWith('군') && (token.includes('하동') || token.includes('구례')))
  const townIndex = tokens.findIndex((token) => /읍$|면$|동$/.test(token))

  if (countyIndex >= 0 && townIndex > countyIndex) {
    return `${tokens[countyIndex]} ${tokens[townIndex]} 일대`
  }

  return region ? `${region}군 일대` : '읍면 단위 표시'
}

function resolveCoordinates(address, region, lat, lng, shouldApproximate) {
  if (!shouldApproximate && lat !== undefined && lng !== undefined) {
    return { lat, lng }
  }

  const target = `${address} ${region}`
  const match = approximateCoordinates.find((coordinate) => target.includes(coordinate.keyword))
  return match ? { lat: match.lat, lng: match.lng } : {}
}

function spreadApproximateCoordinates(coordinates, seed) {
  if (coordinates.lat === undefined || coordinates.lng === undefined) {
    return coordinates
  }

  let hash = 0
  for (const char of String(seed)) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  }

  const angle = ((hash % 360) * Math.PI) / 180
  const radius = 0.004 + ((hash % 9) * 0.0012)

  return {
    lat: Number((coordinates.lat + Math.sin(angle) * radius).toFixed(5)),
    lng: Number((coordinates.lng + Math.cos(angle) * radius).toFixed(5)),
  }
}

function createVacantHouseName(addressLabel, index) {
  const areaLabel = addressLabel.replace(' 일대', '')
  return `${areaLabel} 빈집 후보 ${String(index + 1).padStart(2, '0')}`
}

function distanceKm(from, to) {
  const toRadians = (degree) => (degree * Math.PI) / 180
  const earthRadiusKm = 6371
  const deltaLat = toRadians(to.lat - from.lat)
  const deltaLng = toRadians(to.lng - from.lng)
  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) *
      Math.cos(toRadians(to.lat)) *
      Math.sin(deltaLng / 2) ** 2

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function nearestExperienceResource(space, resources) {
  if (space.lat === undefined || space.lng === undefined || resources.length === 0) {
    return undefined
  }

  const distances = resources
    .filter((resource) => resource.region === space.region)
    .map((resource) => distanceKm(space, resource))
    .sort((a, b) => a - b)

  return distances[0]
}

function gradeScore(grade) {
  const normalized = String(grade ?? '')
  if (normalized.includes('1')) return 25
  if (normalized.includes('2')) return 20
  if (normalized.includes('3')) return 10
  if (normalized.includes('4')) return 0
  return 14
}

function tourismScore(distance) {
  if (distance === undefined) return 10
  if (distance <= 3) return 25
  if (distance <= 5) return 18
  if (distance <= 10) return 10
  return 4
}

function transportScore(space) {
  if (space.lat !== undefined && space.lng !== undefined) return 16
  return 10
}

function sizeScore(buildingAreaSqm, landAreaSqm) {
  const size = buildingAreaSqm ?? landAreaSqm
  if (size === undefined) return 8
  if (size >= 60 && size <= 300) return 15
  if (size >= 30 && size <= 500) return 10
  return 6
}

function availabilityScore(transactionType) {
  const normalized = String(transactionType ?? '')
  if (/임대|매매|가능|대부/.test(normalized)) return 15
  return 7
}

function suitabilityLevel(score) {
  if (score >= 80) return '높음'
  if (score >= 65) return '중상'
  if (score >= 50) return '중간'
  return '낮음'
}

function calculateSuitability(space) {
  const score = Math.min(
    100,
    gradeScore(space.vacantGrade) +
      tourismScore(space.tourismDistanceKm) +
      transportScore(space) +
      sizeScore(space.buildingAreaSqm, space.landAreaSqm) +
      availabilityScore(space.transactionType),
  )

  return {
    suitabilityScore: score,
    suitabilityLevel: suitabilityLevel(score),
  }
}

function createExperienceResources(rows) {
  return rows.flatMap((row, index) => {
    const region = detectRegion(row)
    const lat = parseNumber(getField(row, ['위도', 'latitude', 'lat']))
    const lng = parseNumber(getField(row, ['경도', 'longitude', 'lng', 'lon']))

    if (!region || lat === undefined || lng === undefined) {
      return []
    }

    return [{ id: `experience-${index}`, region, lat, lng }]
  })
}

function createHadongEmptyHouseSpaces(rows, experienceResources) {
  return rows.flatMap((row, index) => {
    const region = detectRegion(row, '하동')
    if (region !== '하동') {
      return []
    }

    const sourceAddress = getField(row, ['소재지', '상세주소', '도로명주소', '지번주소', '소재지주소', '주소'])
    const privacyAvailable = parseBooleanAvailability(
      getField(row, ['개인정보', '공개여부', '제공동의', '정보공개']),
    )
    const sourceLat = parseNumber(getField(row, ['위도', 'latitude', 'lat']))
    const sourceLng = parseNumber(getField(row, ['경도', 'longitude', 'lng', 'lon']))
    const shouldProtectCoordinates = privacyAvailable === false
    const baseCoordinates = resolveCoordinates(
      sourceAddress,
      region,
      sourceLat,
      sourceLng,
      shouldProtectCoordinates,
    )
    const coordinates =
      shouldProtectCoordinates || sourceLat === undefined || sourceLng === undefined
        ? spreadApproximateCoordinates(baseCoordinates, `${sourceAddress}-${index}`)
        : baseCoordinates
    const addressLabel = maskAddress(sourceAddress, region)

    const space = {
      id: `hadong-empty-house-${index + 1}`,
      name: createVacantHouseName(addressLabel, index),
      region,
      type: '빈집',
      ...coordinates,
      addressLabel,
      sourceDataset: datasetNames.hadongEmptyHouse,
      buildingYear: parseNumber(getField(row, ['건축연도', '건축년도', '준공년도', '사용승인연도', '사용승인일'])),
      buildingAreaSqm: parseNumber(getField(row, ['건축면적', '건물면적', '연면적'])),
      landAreaSqm: parseNumber(getField(row, ['대지면적', '토지면적'])),
      vacantGrade: getField(row, ['빈집등급', '등급']),
      privacyAvailable,
      transactionType: getField(row, ['거래구분', '거래유형', '거래형태', '임대매매', '매매임대']),
      useCase: '숙박형',
      suitabilityScore: 0,
      suitabilityLevel: '낮음',
      mainReason: '하동군 빈집정보를 기반으로 건물 상태, 면적, 거래 가능성, 체험자원 접근성을 종합 산정했습니다.',
    }

    const tourismDistanceKm = nearestExperienceResource(space, experienceResources)
    const nextSpace = {
      ...space,
      tourismDistanceKm: tourismDistanceKm === undefined ? undefined : Number(tourismDistanceKm.toFixed(1)),
      experienceLinked: tourismDistanceKm !== undefined && tourismDistanceKm <= 5,
      useCase: tourismDistanceKm !== undefined && tourismDistanceKm <= 5 ? '체험연계형' : '숙박형',
    }

    return [
      {
        ...nextSpace,
        ...calculateSuitability(nextSpace),
      },
    ]
  })
}

function createClosedSchoolSpaces(rows, experienceResources) {
  return rows.flatMap((row, index) => {
    const region = detectRegion(row)
    if (!region) {
      return []
    }

    const address = getField(row, ['주소', '소재지', '위치'])
    const schoolName = getField(row, ['학교명', '폐교명', '재산명', '시설명']) || `${region} 폐교 후보`
    const coordinates = resolveCoordinates(
      address,
      region,
      parseNumber(getField(row, ['위도', 'latitude', 'lat'])),
      parseNumber(getField(row, ['경도', 'longitude', 'lng', 'lon'])),
      false,
    )

    const space = {
      id: `${region === '하동' ? 'hadong' : 'gurye'}-closed-school-${index + 1}`,
      name: schoolName,
      region,
      type: '폐교',
      ...coordinates,
      addressLabel: maskAddress(address, region),
      sourceDataset: `${region === '하동' ? '경상남도교육청' : '전라남도교육청'} ${datasetNames.closedSchool}`,
      buildingAreaSqm: parseNumber(getField(row, ['건축면적', '연면적', '건물면적', '건물'])),
      landAreaSqm: parseNumber(getField(row, ['대지면적', '토지면적', '부지면적', '토지'])),
      privacyAvailable: true,
      transactionType: getField(row, ['활용현황', '대부현황', '매각현황', '현재상태', '향후계획', '상태']),
      useCase: '커뮤니티형',
      suitabilityScore: 0,
      suitabilityLevel: '낮음',
      mainReason: '폐교재산 현황을 기반으로 부지 규모, 활용 상태, 체험자원 접근성을 종합 산정했습니다.',
    }

    const tourismDistanceKm = nearestExperienceResource(space, experienceResources)
    const nextSpace = {
      ...space,
      tourismDistanceKm: tourismDistanceKm === undefined ? undefined : Number(tourismDistanceKm.toFixed(1)),
      experienceLinked: tourismDistanceKm !== undefined && tourismDistanceKm <= 5,
    }

    return [
      {
        ...nextSpace,
        ...calculateSuitability(nextSpace),
      },
    ]
  })
}

function readGuryeAggregateEmptyHouseCount(rows) {
  const guryeRow = rows.find((row) => detectRegion(row) === '구례')
  if (!guryeRow) {
    return 0
  }

  const yearlyValues = Object.entries(guryeRow)
    .map(([key, value]) => {
      const year = parseNumber(key)
      const count = parseNumber(value)
      return year !== undefined && count !== undefined ? { year, count } : undefined
    })
    .filter((value) => value !== undefined)
    .sort((a, b) => a.year - b.year)

  if (yearlyValues.length > 0) {
    return yearlyValues.at(-1).count
  }

  const values = Object.entries(guryeRow)
    .filter(([key]) => !normalizeHeader(key).includes('시군'))
    .map(([, value]) => parseNumber(value))
    .filter((value) => value !== undefined)

  return values.at(-1) ?? 0
}

function buildStats(spaces, guryeAggregateEmptyHouseCount) {
  const emptyHouseCount =
    spaces.filter((space) => space.type === '빈집').length + guryeAggregateEmptyHouseCount
  const unusedSpaces = spaces.filter((space) => space.type !== '빈집').length
  const workationCandidates = spaces.filter((space) => space.suitabilityScore >= 50).length
  const experienceLinkable = spaces.filter((space) => space.experienceLinked).length

  const composition = [
    { name: '빈집', value: emptyHouseCount },
    { name: '폐교', value: spaces.filter((space) => space.type === '폐교').length },
    { name: '유휴 공공시설', value: spaces.filter((space) => space.type === '유휴 공공시설').length },
    { name: '미활용 상가', value: spaces.filter((space) => space.type === '미활용 상가').length },
  ]

  return {
    sourceType: 'real-json',
    sourceLabel: '공간 데이터: 공공데이터 기반',
    period: '원자료 기준 최신 공개일자 기반',
    kpis: {
      availableEmptyHouses: emptyHouseCount,
      unusedSpaces,
      workationCandidates,
      experienceLinkable,
    },
    spaceTypeComposition: composition,
    spaces,
    topCandidates: spaces
      .filter((space) => space.suitabilityScore >= 50)
      .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
      .slice(0, 5)
      .map((space, index) => ({
        rank: index + 1,
        name: space.name,
        type: space.type,
        suitabilityLevel: space.suitabilityLevel,
        suitabilityScore: space.suitabilityScore,
      })),
    dataNotes: [
      '빈집 상세주소는 개인정보 및 사유재산 보호를 위해 읍면 단위 또는 보정 좌표로 표시했습니다.',
      '구례 빈집은 시군별 집계 자료이므로 상세 주소 기반 지도 마커로 표시하지 않았습니다.',
      '적합도는 건물 상태, 체험자원 접근성, 교통 접근성, 공간 규모, 활용 가능성을 100점 기준으로 산정했습니다.',
    ],
  }
}

async function main() {
  let files

  try {
    files = await readdir(rawDir)
  } catch {
    console.log(`[workation-data] Raw data directory not found: ${rawDir}`)
    console.log('[workation-data] Add CSV/XLS files under public/data/raw/workation and run again.')
    return
  }

  const tableFiles = files.filter((file) => /\.(csv|xls|xlsx)$/i.test(file))
  if (tableFiles.length === 0) {
    console.log(`[workation-data] No CSV/XLS files found in: ${rawDir}`)
    return
  }

  const groupedRows = {
    hadongEmptyHouse: [],
    guryeEmptyHouseStats: [],
    closedSchool: [],
    experienceVillage: [],
  }

  for (const file of tableFiles) {
    const filePath = path.join(rawDir, file)
    const rows = await readTable(filePath)
    const normalizedName = normalizeHeader(file)

    if (normalizedName.includes('빈집정보') && normalizedName.includes('하동')) {
      groupedRows.hadongEmptyHouse.push(...rows)
    } else if (normalizedName.includes('시군별빈집') || normalizedName.includes('빈집현황')) {
      groupedRows.guryeEmptyHouseStats.push(...rows)
    } else if (normalizedName.includes('폐교')) {
      groupedRows.closedSchool.push(...rows)
    } else if (normalizedName.includes('체험휴양마을')) {
      groupedRows.experienceVillage.push(...rows)
    } else {
      console.warn(`[workation-data] Unrecognized source file skipped: ${file}`)
    }
  }

  const experienceResources = createExperienceResources(groupedRows.experienceVillage)
  const spaces = [
    ...createHadongEmptyHouseSpaces(groupedRows.hadongEmptyHouse, experienceResources),
    ...createClosedSchoolSpaces(groupedRows.closedSchool, experienceResources),
  ]

  if (spaces.length === 0 && groupedRows.guryeEmptyHouseStats.length === 0) {
    console.log('[workation-data] No usable workation space records were found.')
    return
  }

  const stats = buildStats(spaces, readGuryeAggregateEmptyHouseCount(groupedRows.guryeEmptyHouseStats))

  await mkdir(path.dirname(outputPath), { recursive: true })
  await writeFile(outputPath, `${JSON.stringify(stats, null, 2)}\n`, 'utf8')
  console.log(`[workation-data] Wrote ${outputPath}`)
  console.log(`[workation-data] Spaces: ${stats.spaces.length}, top candidates: ${stats.topCandidates.length}`)
}

await main()

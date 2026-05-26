import L from 'leaflet'
import { useMemo } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { WorkationSpace, WorkationSpaceType } from '../types/workation'

type WorkationSpaceMapProps = {
  spaces: WorkationSpace[]
}

const mapCenter: [number, number] = [35.19, 127.57]

type MappableWorkationSpace = WorkationSpace & {
  lat: number
  lng: number
}

type WorkationMarkerGroup = {
  id: string
  region: WorkationSpace['region']
  type: WorkationSpaceType
  lat: number
  lng: number
  displayLat: number
  displayLng: number
  addressLabel: string
  spaces: MappableWorkationSpace[]
}

const houseIconHtml = `
  <svg viewBox="0 0 24 24" focusable="false" aria-hidden="true">
    <path d="M3.5 10.8 12 4l8.5 6.8" />
    <path d="M5.8 10.2v9.2h12.4v-9.2" />
    <path d="M10.1 19.4v-5h3.8v5" />
  </svg>
`

const markerTypeIconHtml: Record<WorkationSpaceType, string> = {
  빈집: houseIconHtml,
  폐교: houseIconHtml,
  '유휴 공공시설': houseIconHtml,
  '미활용 상가': houseIconHtml,
}

const displayTypeLabels: Record<WorkationSpaceType, string> = {
  빈집: '빈집',
  폐교: '폐교',
  '유휴 공공시설': '공공시설',
  '미활용 상가': '상가',
}

function isMappableSpace(space: WorkationSpace): space is MappableWorkationSpace {
  return typeof space.lat === 'number' && typeof space.lng === 'number'
}

function getRegionClass(target: Pick<WorkationSpace, 'region'>) {
  return target.region === '하동' ? 'hadong' : 'gurye'
}

function getGroupKey(space: MappableWorkationSpace) {
  const locationKey = space.type === '빈집'
    ? space.addressLabel
    : `${space.addressLabel}-${space.lat.toFixed(4)}-${space.lng.toFixed(4)}`

  return [space.region, space.type, locationKey].join('|')
}

function groupMappableSpaces(spaces: WorkationSpace[]) {
  const grouped = new Map<string, MappableWorkationSpace[]>()

  for (const space of spaces.filter(isMappableSpace)) {
    const key = getGroupKey(space)
    const current = grouped.get(key) ?? []
    current.push(space)
    grouped.set(key, current)
  }

  const markerGroups = Array.from(grouped.entries()).map(([key, groupedSpaces]) => {
    const [firstSpace] = groupedSpaces
    const lat = groupedSpaces.reduce((sum, space) => sum + space.lat, 0) / groupedSpaces.length
    const lng = groupedSpaces.reduce((sum, space) => sum + space.lng, 0) / groupedSpaces.length

    return {
      id: key,
      region: firstSpace.region,
      type: firstSpace.type,
      lat,
      lng,
      displayLat: lat,
      displayLng: lng,
      addressLabel: firstSpace.addressLabel,
      spaces: groupedSpaces,
    }
  })

  return spreadMarkerGroups(markerGroups)
}

function getDisplayBucketKey(group: WorkationMarkerGroup) {
  const bucketSize = 0.06

  return [
    group.region,
    Math.round(group.lat / bucketSize),
    Math.round(group.lng / bucketSize),
  ].join('|')
}

function spreadMarkerGroups(groups: WorkationMarkerGroup[]) {
  const bucketCounts = new Map<string, number>()
  const bucketIndexes = new Map<string, number>()

  for (const group of groups) {
    const key = getDisplayBucketKey(group)
    bucketCounts.set(key, (bucketCounts.get(key) ?? 0) + 1)
  }

  return groups.map((group) => {
    const key = getDisplayBucketKey(group)
    const count = bucketCounts.get(key) ?? 1
    const index = bucketIndexes.get(key) ?? 0
    bucketIndexes.set(key, index + 1)

    if (count <= 1) {
      return group
    }

    const angle = (Math.PI * 2 * index) / count
    const radius = 0.018 + Math.floor(index / 8) * 0.008

    return {
      ...group,
      displayLat: Number((group.lat + Math.sin(angle) * radius).toFixed(5)),
      displayLng: Number((group.lng + Math.cos(angle) * radius).toFixed(5)),
    }
  })
}

function createIdleSpaceIcon(group: WorkationMarkerGroup) {
  const iconHtml = markerTypeIconHtml[group.type]
  const regionClass = getRegionClass(group)
  const isGrouped = group.spaces.length > 1
  const size = isGrouped ? 36 : 30
  const countLabel = isGrouped ? `<em>${group.spaces.length}</em>` : ''

  return L.divIcon({
    className: 'workationMarkerIcon',
    html: `<span class="workationMarker ${regionClass}${isGrouped ? ' grouped' : ''}" aria-hidden="true">${iconHtml}${countLabel}</span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  })
}

function getTopSpaces(group: WorkationMarkerGroup) {
  return [...group.spaces]
    .sort((a, b) => b.suitabilityScore - a.suitabilityScore)
    .slice(0, 4)
}

function WorkationGroupPopup({ group }: { group: WorkationMarkerGroup }) {
  const regionClass = getRegionClass(group)
  const isGrouped = group.spaces.length > 1
  const representative = getTopSpaces(group)[0]

  return (
    <article className="workationPopup">
      <span className={`workationPopupRegion ${regionClass}`}>
        {group.region}
      </span>
      <h3>
        {isGrouped
          ? `${group.addressLabel} ${displayTypeLabels[group.type]} 후보 ${group.spaces.length}건`
          : representative.name}
      </h3>
      <dl>
        <div>
          <dt>지역</dt>
          <dd>{group.region}</dd>
        </div>
        <div>
          <dt>유형</dt>
          <dd>{displayTypeLabels[group.type]}</dd>
        </div>
        <div>
          <dt>적합도</dt>
          <dd>
            {representative.suitabilityLevel} · {representative.suitabilityScore}점
          </dd>
        </div>
        <div>
          <dt>활용 제안</dt>
          <dd>{representative.useCase}</dd>
        </div>
        <div>
          <dt>주소 표시</dt>
          <dd>{group.addressLabel}</dd>
        </div>
        <div>
          <dt>표시 방식</dt>
          <dd>{isGrouped ? '읍면·유형 단위 집계 마커' : '보정 좌표 마커'}</dd>
        </div>
        {!isGrouped ? (
          <div>
            <dt>주요 근거</dt>
            <dd>{representative.mainReason}</dd>
          </div>
        ) : null}
      </dl>
      {isGrouped ? (
        <ul className="workationPopupList">
          {getTopSpaces(group).map((space) => (
            <li key={space.id}>
              <span>{space.name}</span>
              <strong>{space.suitabilityLevel}</strong>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export default function WorkationSpaceMap({ spaces }: WorkationSpaceMapProps) {
  const markerGroups = useMemo(() => groupMappableSpaces(spaces), [spaces])
  const markerIcons = useMemo(() => {
    return Object.fromEntries(markerGroups.map((group) => [group.id, createIdleSpaceIcon(group)]))
  }, [markerGroups])

  return (
    <div className="workationMap" aria-label="하동·구례 유휴공간 분포 지도">
      <MapContainer center={mapCenter} zoom={10} scrollWheelZoom={false} className="workationMapCanvas">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markerGroups.map((group) => (
          <Marker
            icon={markerIcons[group.id]}
            key={group.id}
            position={[group.displayLat, group.displayLng]}
          >
            <Popup>
              <WorkationGroupPopup group={group} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <p className="workationMapPrivacyNote">
        상세주소는 개인정보 보호를 위해 읍면 단위 또는 보정 좌표로 표시되며, 같은 권역의 빈집은 집계 마커로 묶어 표시됩니다.
      </p>

      <div className="workationMapLegend" aria-label="지도 범례">
        <span>
          <i className="workationLegendBox hadong" aria-hidden="true" />
          하동
        </span>
        <span>
          <i className="workationLegendBox gurye" aria-hidden="true" />
          구례
        </span>
        <span>집 후보 공간</span>
        <span>숫자 집계 건수</span>
      </div>

      <p className="workationMapSource">지도 데이터: 공공데이터 + OpenStreetMap</p>
    </div>
  )
}

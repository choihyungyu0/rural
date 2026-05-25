import L from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import {
  inconvenienceSegments,
  type InconvenienceLevel,
  type InconvenienceSegment,
} from '../data/inconvenienceSegments'
import { fallbackTourPlaces, tourKeywords } from '../data/tourMapData'
import { fetchRoadRoute, type RouteCoordinate } from '../services/roadRoute'
import { searchTourPlacesByKeywords, type TourPlace } from '../services/tourApi'

type MapStatus = 'loading' | 'api' | 'fallback'
type MarkerRegion = 'hadong' | 'gurye'
type Coordinate = RouteCoordinate

const mapCenter: Coordinate = [35.19, 127.56]
const hadongSignals = ['하동', '화개', '평사리', '야생차']
const keyBottleneckSegment = inconvenienceSegments.find((segment) => segment.level === 'danger')
const expectedInconvenienceCount = inconvenienceSegments.filter((segment) => segment.level === 'caution').length

const segmentStyles: Record<
  InconvenienceLevel,
  { color: string; weight: number; opacity: number; dashArray: string }
> = {
  normal: {
    color: '#16a34a',
    weight: 4,
    opacity: 0.75,
    dashArray: '6 8',
  },
  caution: {
    color: '#f59e0b',
    weight: 5,
    opacity: 0.9,
    dashArray: '8 8',
  },
  danger: {
    color: '#dc2626',
    weight: 6,
    opacity: 0.95,
    dashArray: '10 8',
  },
}

type ResolvedSegment = InconvenienceSegment & {
  id: string
  positions: [Coordinate, Coordinate]
}

function isHadongPlace(place: TourPlace) {
  const target = `${place.title} ${place.address}`
  return hadongSignals.some((signal) => target.includes(signal))
}

function getMarkerRegion(place: TourPlace): MarkerRegion {
  return isHadongPlace(place) ? 'hadong' : 'gurye'
}

function createMarkerIcon(region: MarkerRegion) {
  const className = region === 'hadong' ? 'tourMapMarkerHadong' : 'tourMapMarkerGurye'

  return L.divIcon({
    className: 'tourMapMarkerIcon',
    html: `<span class="tourMapMarker ${className}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  })
}

function normalizePlaceTitle(title: string) {
  return title.replace(/\s/g, '').toLowerCase()
}

function findPlaceBySegmentTitle(title: string, places: TourPlace[]) {
  const normalizedTitle = normalizePlaceTitle(title)
  const exactMatch = places.find((place) => normalizePlaceTitle(place.title) === normalizedTitle)

  if (exactMatch) {
    return exactMatch
  }

  const partialMatch = places.find((place) => {
    const normalizedPlaceTitle = normalizePlaceTitle(place.title)
    return normalizedPlaceTitle.includes(normalizedTitle) || normalizedTitle.includes(normalizedPlaceTitle)
  })

  if (partialMatch) {
    return partialMatch
  }

  const fallbackIndex = fallbackTourPlaces.findIndex((place) => place.title === title)

  if (fallbackIndex >= 0) {
    return places[fallbackIndex] ?? fallbackTourPlaces[fallbackIndex]
  }

  const keywordIndex = tourKeywords.findIndex((keyword) => keyword === title)
  return keywordIndex >= 0 ? places[keywordIndex] : undefined
}

function resolveSegments(places: TourPlace[]): ResolvedSegment[] {
  return inconvenienceSegments.flatMap((segment) => {
    const fromPlace = findPlaceBySegmentTitle(segment.from, places)
    const toPlace = findPlaceBySegmentTitle(segment.to, places)

    if (!fromPlace || !toPlace) {
      return []
    }

    return [
      {
        ...segment,
        id: `${segment.from}-${segment.to}`,
        positions: [
          [fromPlace.lat, fromPlace.lng],
          [toPlace.lat, toPlace.lng],
        ],
      },
    ]
  })
}

const statusLabels: Record<MapStatus, string> = {
  loading: '공공데이터 불러오는 중',
  api: 'TourAPI 공공데이터 표시 중',
  fallback: 'API 미연결: 임시 좌표 표시 중',
}

export default function LeafletTourMap() {
  const [places, setPlaces] = useState<TourPlace[]>(fallbackTourPlaces)
  const [status, setStatus] = useState<MapStatus>('loading')
  const [roadRoutes, setRoadRoutes] = useState<Record<string, Coordinate[]>>({})

  const markerIcons = useMemo(
    () => ({
      hadong: createMarkerIcon('hadong'),
      gurye: createMarkerIcon('gurye'),
    }),
    [],
  )

  const routeSegments = useMemo<ResolvedSegment[]>(
    () => resolveSegments(places),
    [places],
  )

  useEffect(() => {
    let isActive = true

    async function loadTourPlaces() {
      setStatus('loading')

      try {
        const keywordResults = await searchTourPlacesByKeywords(tourKeywords)

        const nextPlaces = keywordResults.map((results, index) => {
          return results[0] ?? fallbackTourPlaces[index]
        })

        const hasApiPlace = nextPlaces.some((place) => place.source === 'api')

        if (isActive) {
          setPlaces(hasApiPlace ? nextPlaces : fallbackTourPlaces)
          setStatus(hasApiPlace ? 'api' : 'fallback')
        }
      } catch {
        if (isActive) {
          setPlaces(fallbackTourPlaces)
          setStatus('fallback')
        }
      }
    }

    void loadTourPlaces()

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    let isActive = true

    async function loadRoadRoutes() {
      const routes = await Promise.all(
        routeSegments.map(async (segment) => {
          const routedPositions = await fetchRoadRoute(segment.positions[0], segment.positions[1])
          return [segment.id, routedPositions] as const
        }),
      )

      if (!isActive) {
        return
      }

      setRoadRoutes(
        Object.fromEntries(
          routes
            .filter(([, positions]) => positions.length >= 2)
            .map(([id, positions]) => [id, positions]),
        ),
      )
    }

    if (routeSegments.length === 0) {
      setRoadRoutes({})
      return undefined
    }

    void loadRoadRoutes()

    return () => {
      isActive = false
    }
  }, [routeSegments])

  return (
    <div className="leafletTourMap" aria-label="하동·구례 관광 자원 연계 지도">
      <MapContainer center={mapCenter} zoom={10} scrollWheelZoom={false} className="tourMapCanvas">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {routeSegments.map((segment) => (
          <Polyline
            key={segment.id}
            positions={roadRoutes[segment.id] ?? segment.positions}
            pathOptions={segmentStyles[segment.level]}
          >
            <Popup>
              <article className="tourMapSegmentPopup">
                <h3>
                  {segment.from} → {segment.to}
                </h3>
                <strong>{segment.label}</strong>
                <p>{segment.reason}</p>
                <dl>
                  <div>
                    <dt>예상 이동시간</dt>
                    <dd>{segment.estimatedTime}</dd>
                  </div>
                  <div>
                    <dt>개선안</dt>
                    <dd>{segment.recommendation}</dd>
                  </div>
                </dl>
              </article>
            </Popup>
          </Polyline>
        ))}
        {places.map((place) => {
          const region = getMarkerRegion(place)
          const regionLabel = region === 'hadong' ? '하동 연계 자원' : '구례 연계 자원'

          return (
            <Marker
              icon={markerIcons[region]}
              key={`${place.id}-${place.source}`}
              position={[place.lat, place.lng]}
            >
              <Popup>
                <article className="tourMapPopup">
                  {place.image ? (
                    <img
                      src={place.image}
                      alt={`${place.title} 관광지 이미지`}
                      className="tourMapPopupImage"
                    />
                  ) : null}
                  <span className={`tourMapRegionLabel ${region}`}>{regionLabel}</span>
                  <h3>{place.title}</h3>
                  <p>{place.address}</p>
                </article>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <span className={`tourMapStatus ${status}`}>{statusLabels[status]}</span>

      <div className="tourMapInconvenienceSummary" aria-label="불편 예상구간 요약">
        <strong>불편 예상구간 {expectedInconvenienceCount}개</strong>
        {keyBottleneckSegment ? (
          <span>
            핵심 개선구간: {keyBottleneckSegment.from} → {keyBottleneckSegment.to}
          </span>
        ) : null}
      </div>

      <div className="tourMapLegend" aria-label="지도 범례">
        <span>
          <i className="tourMapLegendDot hadong" aria-hidden="true" />
          하동 자원
        </span>
        <span>
          <i className="tourMapLegendDot gurye" aria-hidden="true" />
          구례 자원
        </span>
        <span>
          <i className="tourMapLegendLine normal" aria-hidden="true" />
          이동 양호
        </span>
        <span>
          <i className="tourMapLegendLine caution" aria-hidden="true" />
          주의 필요
        </span>
        <span>
          <i className="tourMapLegendLine danger" aria-hidden="true" />
          개선 필요
        </span>
      </div>

      <p className="tourMapAnalysisNote">
        불편 예상구간은 이동시간·지역 간 연계 필요성을 바탕으로 산정한 분석 지표이며, 선형은
        OpenStreetMap 기반 도로 경로를 우선 사용합니다.
      </p>
      <p className="tourMapSourceNote">
        지도 데이터: 한국관광공사 TourAPI + OpenStreetMap · 도로 경로: OSM 기반 라우팅
      </p>
    </div>
  )
}

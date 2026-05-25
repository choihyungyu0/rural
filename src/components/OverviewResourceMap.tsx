import L from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { fallbackTourPlaces, tourKeywords } from '../data/tourMapData'
import { searchTourPlacesByKeyword, type TourPlace } from '../services/tourApi'

type MapStatus = 'loading' | 'api' | 'fallback'
type MarkerRegion = 'hadong' | 'gurye'
type Coordinate = [number, number]

const mapCenter: Coordinate = [35.19, 127.56]
const hadongSignals = ['하동', '화개', '평사리', '야생차']

const statusLabels: Record<MapStatus, string> = {
  loading: '공공데이터 불러오는 중',
  api: 'TourAPI 공공데이터 표시 중',
  fallback: 'API 미연결: 임시 좌표 표시 중',
}

function isHadongPlace(place: TourPlace) {
  const target = `${place.title} ${place.address}`
  return hadongSignals.some((signal) => target.includes(signal))
}

function getMarkerRegion(place: TourPlace): MarkerRegion {
  return isHadongPlace(place) ? 'hadong' : 'gurye'
}

function createMarkerIcon(region: MarkerRegion) {
  const className =
    region === 'hadong' ? 'overviewResourceMarkerHadong' : 'overviewResourceMarkerGurye'

  return L.divIcon({
    className: 'overviewResourceMarkerIcon',
    html: `<span class="overviewResourceMarker ${className}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  })
}

function ResizeMapOnMount({ places }: { places: TourPlace[] }) {
  const map = useMap()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      map.invalidateSize()
    }, 150)

    return () => window.clearTimeout(timer)
  }, [map, places])

  return null
}

export default function OverviewResourceMap() {
  const [places, setPlaces] = useState<TourPlace[]>(fallbackTourPlaces)
  const [status, setStatus] = useState<MapStatus>('loading')

  const markerIcons = useMemo(
    () => ({
      hadong: createMarkerIcon('hadong'),
      gurye: createMarkerIcon('gurye'),
    }),
    [],
  )

  const routePositions = useMemo<Coordinate[]>(
    () => places.map((place) => [place.lat, place.lng]),
    [places],
  )

  useEffect(() => {
    let isActive = true

    async function loadTourPlaces() {
      setStatus('loading')

      try {
        const keywordResults = await Promise.all(
          tourKeywords.map((keyword) => searchTourPlacesByKeyword(keyword)),
        )

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

  return (
    <div className="overviewResourceMap" aria-label="하동·구례 관광 자원 연계 지도">
      <MapContainer
        center={mapCenter}
        zoom={10}
        zoomControl={false}
        scrollWheelZoom={false}
        className="overviewResourceMapCanvas"
      >
        <ResizeMapOnMount places={places} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={routePositions}
          pathOptions={{ color: '#2563eb', dashArray: '7 9', weight: 3, opacity: 0.72 }}
        />
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
                <article className="overviewResourcePopup">
                  {place.image ? (
                    <img
                      src={place.image}
                      alt={`${place.title} 관광지 이미지`}
                      className="overviewResourcePopupImage"
                    />
                  ) : null}
                  <span className={`overviewResourceRegionLabel ${region}`}>{regionLabel}</span>
                  <h3>{place.title}</h3>
                  <p>{place.address}</p>
                </article>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <span className={`overviewResourceStatus ${status}`}>{statusLabels[status]}</span>

      <div className="overviewResourceLegend" aria-label="지도 범례">
        <span>
          <i className="overviewResourceLegendDot hadong" aria-hidden="true" />
          하동 자원
        </span>
        <span>
          <i className="overviewResourceLegendDot gurye" aria-hidden="true" />
          구례 자원
        </span>
      </div>

      <p className="overviewResourceSource">지도 데이터: 한국관광공사 TourAPI + OpenStreetMap</p>
    </div>
  )
}

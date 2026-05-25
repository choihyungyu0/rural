import L from 'leaflet'
import { useEffect, useMemo, useState } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import { fallbackTourPlaces, tourKeywords } from '../data/tourMapData'
import { searchTourPlacesByKeyword, type TourPlace } from '../services/tourApi'

type Coordinate = [number, number]
type MarkerRegion = 'hadong' | 'gurye'

const mapCenter: Coordinate = [35.19, 127.56]
const hadongSignals = ['하동', '화개', '평사리', '야생차']

function isHadongPlace(place: TourPlace) {
  const target = `${place.title} ${place.address}`
  return hadongSignals.some((signal) => target.includes(signal))
}

function getMarkerRegion(place: TourPlace): MarkerRegion {
  return isHadongPlace(place) ? 'hadong' : 'gurye'
}

function createMiniMarkerIcon(region: MarkerRegion) {
  const className = region === 'hadong' ? 'analysisMiniMapMarkerHadong' : 'analysisMiniMapMarkerGurye'

  return L.divIcon({
    className: 'analysisMiniMapMarkerIcon',
    html: `<span class="analysisMiniMapMarker ${className}"></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -8],
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

export default function AnalysisRegionMiniMap() {
  const [places, setPlaces] = useState<TourPlace[]>(fallbackTourPlaces)
  const dataSource = places.some((place) => place.source === 'api') ? 'api' : 'fallback'

  const markerIcons = useMemo(
    () => ({
      hadong: createMiniMarkerIcon('hadong'),
      gurye: createMiniMarkerIcon('gurye'),
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
      try {
        const keywordResults = await Promise.all(
          tourKeywords.map((keyword) => searchTourPlacesByKeyword(keyword)),
        )

        const nextPlaces = keywordResults.map((results, index) => {
          return results[0] ?? fallbackTourPlaces[index]
        })

        if (isActive && nextPlaces.some((place) => place.source === 'api')) {
          setPlaces(nextPlaces)
        }
      } catch {
        if (isActive) {
          setPlaces(fallbackTourPlaces)
        }
      }
    }

    void loadTourPlaces()

    return () => {
      isActive = false
    }
  }, [])

  return (
    <div
      className="analysisRegionMiniMap"
      aria-label="하동·구례 관광 자원 미니 지도"
      data-source={dataSource}
    >
      <MapContainer
        center={mapCenter}
        zoom={10}
        zoomControl={false}
        scrollWheelZoom={false}
        className="analysisMiniMapCanvas"
      >
        <ResizeMapOnMount places={places} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={routePositions}
          pathOptions={{ color: '#2563eb', dashArray: '6 8', weight: 3, opacity: 0.72 }}
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
                <article className="analysisMiniMapPopup">
                  <span className={`analysisMiniMapRegionLabel ${region}`}>{regionLabel}</span>
                  <h3>{place.title}</h3>
                  <p>{place.address}</p>
                </article>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      <span className="analysisMiniMapSource">TourAPI + OpenStreetMap</span>
      <div className="analysisMiniMapLegend" aria-label="미니 지도 범례">
        <span>
          <i className="analysisMiniMapLegendDot hadong" aria-hidden="true" />
          하동 자원
        </span>
        <span>
          <i className="analysisMiniMapLegendDot gurye" aria-hidden="true" />
          구례 자원
        </span>
      </div>
    </div>
  )
}

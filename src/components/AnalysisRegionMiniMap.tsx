import L from 'leaflet'
import { useEffect, useMemo } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import type { RegionCompositionItem } from '../data/analysisData'

type Coordinate = [number, number]
type RegionKey = 'hadong' | 'gurye'

type AnalysisRegionMiniMapProps = {
  data: RegionCompositionItem[]
}

type RegionMarker = {
  key: RegionKey
  label: string
  percentage: number
  position: Coordinate
  color: string
}

const mapCenter: Coordinate = [35.14, 127.6]
const hadongPosition: Coordinate = [35.067, 127.751]
const guryePosition: Coordinate = [35.2025, 127.4622]

const markerConfig = {
  hadong: {
    label: '하동',
    fallbackPercentage: 59.4,
    color: '#16a34a',
    position: hadongPosition,
  },
  gurye: {
    label: '구례',
    fallbackPercentage: 40.6,
    color: '#2563eb',
    position: guryePosition,
  },
} satisfies Record<RegionKey, Omit<RegionMarker, 'key' | 'percentage'> & { fallbackPercentage: number }>

function formatPercentage(value: number) {
  return value.toFixed(1)
}

function getRegionPercentage(data: RegionCompositionItem[], region: RegionKey, fallbackIndex: number) {
  const config = markerConfig[region]
  const matchedItem = data.find((item) => item.region.includes(config.label)) ?? data[fallbackIndex]

  return Number.isFinite(matchedItem?.value) ? matchedItem.value : config.fallbackPercentage
}

function getBubbleSize(percentage: number) {
  return Math.round(Math.min(78, Math.max(54, 44 + percentage * 0.45)))
}

function createBubbleIcon(marker: RegionMarker) {
  const size = getBubbleSize(marker.percentage)
  const percentage = formatPercentage(marker.percentage)

  return L.divIcon({
    className: 'analysisMiniMapBubbleIcon',
    html: `
      <div class="analysisMiniMapBubble" style="width:${size}px;height:${size}px;background:${marker.color};">
        <span>${marker.label}</span>
        <strong>${percentage}%</strong>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  })
}

function ResizeMapOnMount({ resizeKey }: { resizeKey: string }) {
  const map = useMap()

  useEffect(() => {
    const timer = window.setTimeout(() => {
      map.invalidateSize()
    }, 150)

    return () => window.clearTimeout(timer)
  }, [map, resizeKey])

  return null
}

export default function AnalysisRegionMiniMap({ data }: AnalysisRegionMiniMapProps) {
  const markers = useMemo<RegionMarker[]>(() => {
    const hadongPercentage = getRegionPercentage(data, 'hadong', 0)
    const guryePercentage = getRegionPercentage(data, 'gurye', 1)

    return [
      {
        key: 'hadong',
        label: markerConfig.hadong.label,
        percentage: hadongPercentage,
        position: markerConfig.hadong.position,
        color: markerConfig.hadong.color,
      },
      {
        key: 'gurye',
        label: markerConfig.gurye.label,
        percentage: guryePercentage,
        position: markerConfig.gurye.position,
        color: markerConfig.gurye.color,
      },
    ]
  }, [data])

  const markerIcons = useMemo(
    () =>
      markers.reduce<Record<RegionKey, L.DivIcon>>(
        (icons, marker) => ({
          ...icons,
          [marker.key]: createBubbleIcon(marker),
        }),
        {} as Record<RegionKey, L.DivIcon>,
      ),
    [markers],
  )

  const resizeKey = markers.map((marker) => `${marker.key}-${marker.percentage}`).join('|')

  return (
    <div className="analysisRegionMiniMap" aria-label="하동·구례 방문자 구성비 미니 지도">
      <MapContainer
        center={mapCenter}
        zoom={9}
        zoomControl={false}
        scrollWheelZoom={false}
        className="analysisMiniMapCanvas"
      >
        <ResizeMapOnMount resizeKey={resizeKey} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline
          positions={[hadongPosition, guryePosition]}
          pathOptions={{ color: '#64748b', weight: 2, opacity: 0.62 }}
        />
        {markers.map((marker) => (
          <Marker icon={markerIcons[marker.key]} key={marker.key} position={marker.position}>
            <Popup>
              <strong className="analysisMiniMapPopupText">
                {marker.label} 방문 비중: {formatPercentage(marker.percentage)}%
              </strong>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <span className="analysisMiniMapSource">한국관광 데이터랩 방문자 비중</span>
    </div>
  )
}

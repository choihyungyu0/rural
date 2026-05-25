export type RouteCoordinate = [number, number]

type OsrmRouteResponse = {
  routes?: Array<{
    geometry?: {
      coordinates?: unknown
    }
  }>
}

function isLngLatPair(value: unknown): value is [number, number] {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === 'number' &&
    Number.isFinite(value[0]) &&
    typeof value[1] === 'number' &&
    Number.isFinite(value[1])
  )
}

function toRouteCoordinates(value: unknown): RouteCoordinate[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .filter(isLngLatPair)
    .map(([lng, lat]) => [lat, lng] satisfies RouteCoordinate)
}

export async function fetchRoadRoute(
  from: RouteCoordinate,
  to: RouteCoordinate,
): Promise<RouteCoordinate[]> {
  const [fromLat, fromLng] = from
  const [toLat, toLng] = to
  const coordinates = `${fromLng},${fromLat};${toLng},${toLat}`
  const params = new URLSearchParams({
    overview: 'full',
    geometries: 'geojson',
  })

  try {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${coordinates}?${params.toString()}`,
    )

    if (!response.ok) {
      return []
    }

    const data = (await response.json()) as OsrmRouteResponse
    const routeCoordinates = data.routes?.[0]?.geometry?.coordinates

    return toRouteCoordinates(routeCoordinates)
  } catch {
    return []
  }
}

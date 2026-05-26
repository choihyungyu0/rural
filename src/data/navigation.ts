export const navigationItems = [
  { label: '개요', hash: '#overview' },
  { label: '방문 현황', hash: '#visitors' },
  { label: '체류·소비 분석', hash: '#analysis' },
  { label: '인사이트', hash: '#insights' },
  { label: '개선 제안', hash: '#improvement' },
] as const

export type NavigationItem = (typeof navigationItems)[number]
export type NavigationHash = NavigationItem['hash']
export type NavigationLabel = NavigationItem['label']

export const defaultNavigationHash: NavigationHash = '#overview'

export function isNavigationHash(hash: string): hash is NavigationHash {
  return navigationItems.some((item) => item.hash === hash)
}

export function getNavigationItemByHash(hash: NavigationHash) {
  return navigationItems.find((item) => item.hash === hash) ?? navigationItems[0]
}

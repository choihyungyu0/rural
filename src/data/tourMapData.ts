import type { TourPlace } from '../services/tourApi'

export const tourKeywords = [
  '화개장터',
  '평사리',
  '하동 야생차',
  '구례 산수유마을',
  '구례 화엄사',
  '구례 한옥',
] as const

export const fallbackTourPlaces: TourPlace[] = [
  {
    id: 'fallback-hwagae-market',
    title: '화개장터',
    address: '경남 하동군 화개면',
    lat: 35.1897,
    lng: 127.6255,
    source: 'fallback',
  },
  {
    id: 'fallback-pyeongsa-ri',
    title: '평사리',
    address: '경남 하동군 악양면',
    lat: 35.1605,
    lng: 127.6865,
    source: 'fallback',
  },
  {
    id: 'fallback-hadong-wild-tea',
    title: '하동 야생차',
    address: '경남 하동군 화개면',
    lat: 35.206,
    lng: 127.633,
    source: 'fallback',
  },
  {
    id: 'fallback-gurye-cornus-village',
    title: '구례 산수유마을',
    address: '전남 구례군 산동면',
    lat: 35.314,
    lng: 127.462,
    source: 'fallback',
  },
  {
    id: 'fallback-gurye-hwaeomsa',
    title: '구례 화엄사',
    address: '전남 구례군 마산면',
    lat: 35.257,
    lng: 127.497,
    source: 'fallback',
  },
  {
    id: 'fallback-gurye-hanok',
    title: '한옥 숙박',
    address: '전남 구례군 일대',
    lat: 35.202,
    lng: 127.462,
    source: 'fallback',
  },
]

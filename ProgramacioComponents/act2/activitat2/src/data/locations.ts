export interface ProvinceInfo {
  name: string
  postalPrefix: string
  cities: string[]
}

export const PROVINCES: ProvinceInfo[] = [
  {
    name: 'Valencia',
    postalPrefix: '46',
    cities: ['Valencia', 'Torrent', 'Gandia'],
  },
  {
    name: 'Alicante',
    postalPrefix: '03',
    cities: ['Alicante', 'Elx', 'Benidorm'],
  },
  {
    name: 'Castello',
    postalPrefix: '12',
    cities: ['Castello de la Plana', 'Vila-real', 'Vinaros'],
  },
]

export function getProvinceInfo(provinceName: string) {
  return PROVINCES.find((province) => province.name === provinceName)
}

export function getCitiesByProvince(provinceName: string) {
  const province = getProvinceInfo(provinceName)
  return province ? province.cities : []
}

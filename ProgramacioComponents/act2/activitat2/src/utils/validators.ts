import { getProvinceInfo } from '../data/locations'

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isValidPhone(value: string) {
  return /^\d{9}$/.test(value)
}

export function isValidDateDDMMYYYY(value: string) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
    return false
  }

  const [dayText, monthText, yearText] = value.split('/')
  const day = Number(dayText)
  const month = Number(monthText)
  const year = Number(yearText)

  const date = new Date(year, month - 1, day)

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  )
}

export function isStrongPassword(value: string) {
  const hasMinLength = value.length >= 12
  const hasNumber = /\d/.test(value)
  const hasSpecialCharacter = /[^A-Za-z0-9]/.test(value)

  return hasMinLength && hasNumber && hasSpecialCharacter
}

export function isPostalCodeValidForProvince(postalCode: string, provinceName: string) {
  if (!/^\d{5}$/.test(postalCode)) {
    return false
  }

  const province = getProvinceInfo(provinceName)
  if (!province) {
    return false
  }

  return postalCode.startsWith(province.postalPrefix)
}

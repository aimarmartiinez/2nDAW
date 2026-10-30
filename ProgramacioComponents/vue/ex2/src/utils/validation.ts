export function validarEmail(text: string) {
  return text.includes('@') && text.includes('.')
}

export function validarData(text: string) {
  return /^\d{2}\/\d{2}\/\d{4}$/.test(text)
}

export function validarContrasenya(text: string) {
  if (text.length < 12) {
    return false
  }
  if (!/[a-zA-Z]/.test(text)) {
    return false
  }
  if (!/[0-9]/.test(text)) {
    return false
  }
  if (!/[^a-zA-Z0-9]/.test(text)) {
    return false
  }
  return true
}

export function validarTelefon(text: string) {
  return text.length === 9
}

export function validarCodiPostal(cp: string, provincia: string) {
  if (cp.length !== 5) {
    return false
  }
  if (provincia === 'Barcelona' && !cp.startsWith('08')) {
    return false
  }
  if (provincia === 'Girona' && !cp.startsWith('17')) {
    return false
  }
  if (provincia === 'Lleida' && !cp.startsWith('25')) {
    return false
  }
  if (provincia === 'Tarragona' && !cp.startsWith('43')) {
    return false
  }
  return true
}

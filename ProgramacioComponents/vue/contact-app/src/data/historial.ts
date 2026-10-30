import type { Historial } from './types'
import request from './api'

export function getHistorial(): Promise<Historial[]> {
  return request('/historial')
}

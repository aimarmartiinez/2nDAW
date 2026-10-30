import type { Grup } from './types'
import request from './api'

export function getGrups(): Promise<Grup[]> {
  return request('/grups')
}

export function createGrup(grup: Omit<Grup, 'id'>): Promise<Grup> {
  return request('/grups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(grup)
  })
}

export function updateGrup(grup: Grup): Promise<Grup> {
  return request(`/grups/${grup.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(grup)
  })
}

export function deleteGrup(id: number | string): Promise<void> {
  return request(`/grups/${id}`, {
    method: 'DELETE'
  })
}
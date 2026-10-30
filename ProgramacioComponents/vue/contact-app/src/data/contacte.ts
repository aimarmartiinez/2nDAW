import type { Contacte } from './types'
import request from './api'

export function getContactes(): Promise<Contacte[]> {
  return request('/contactes')
}

export function createContacte(contacte: Omit<Contacte, 'id' | 'dataCreacio'>): Promise<Contacte> {
  const nouContacte = {
    ...contacte,
    dataCreacio: new Date().toISOString()
  }
  return request('/contactes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nouContacte)
  })
}

export function updateContacte(contacte: Contacte): Promise<Contacte> {
  return request(`/contactes/${contacte.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contacte)
  })
}

export function deleteContacte(id: string): Promise<void> {
  return request(`/contactes/${id}`, {
    method: 'DELETE'
  })
}

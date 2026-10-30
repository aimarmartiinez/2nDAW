import { useState } from 'react'
import type { RegistrationFormData } from '../types/registration'

const FAKE_API_URL = 'https://jsonplaceholder.typicode.com/users'

export function useRegisterApi() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState('')

  async function submitRegistration(data: RegistrationFormData) {
    setIsSubmitting(true)
    setApiError('')

    try {
      const response = await fetch(FAKE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('No s han pogut enviar les dades')
      }

      return await response.json()
    } catch {
      setApiError('Error enviant dades a la Fake API')
      return null
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    isSubmitting,
    apiError,
    submitRegistration,
  }
}

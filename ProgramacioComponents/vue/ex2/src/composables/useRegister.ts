import { ref } from 'vue'
import type { RegisterData } from '@/types/register'

export function useRegister() {
  const loading = ref(false)
  const error = ref('')

  async function enviarRegistre(dades: RegisterData) {
    loading.value = true
    error.value = ''

    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: dades.nom,
          cognoms: dades.cognoms,
          email: dades.email,
          telefon: dades.telefon,
          dataNaiximent: dades.dataNaiximent,
          adreca: dades.adreca,
          provincia: dades.provincia,
          poblacio: dades.poblacio,
          codiPostal: dades.codiPostal,
        }),
      })

      if (!resposta.ok) {
        error.value = 'Error al enviar a JSONPlaceholder'
        return false
      }

      return true
    } catch {
      error.value = 'Error al enviar a JSONPlaceholder'
      return false
    } finally {
      loading.value = false
    }
  }

  return { loading, error, enviarRegistre }
}
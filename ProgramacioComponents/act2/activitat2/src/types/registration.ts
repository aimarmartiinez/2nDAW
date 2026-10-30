export interface RegistrationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  birthDate: string
  password: string
  confirmPassword: string
  address: string
  province: string
  city: string
  postalCode: string
}

export const DEFAULT_FORM_VALUES: RegistrationFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  password: '',
  confirmPassword: '',
  address: '',
  province: '',
  city: '',
  postalCode: '',
}

export type RegistrationErrors = Partial<Record<keyof RegistrationFormData, string>>

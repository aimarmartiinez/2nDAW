import { type ChangeEvent, type FormEvent, useMemo, useState } from 'react'
import { getCitiesByProvince, PROVINCES } from '../data/locations'
import { useRegisterApi } from '../hooks/useRegisterApi'
import {
  DEFAULT_FORM_VALUES,
  type RegistrationErrors,
  type RegistrationFormData,
} from '../types/registration'
import {
  isPostalCodeValidForProvince,
  isStrongPassword,
  isValidDateDDMMYYYY,
  isValidEmail,
  isValidPhone,
} from '../utils/validators'

function RegisterManualPage() {
  const [formData, setFormData] = useState<RegistrationFormData>({
    ...DEFAULT_FORM_VALUES,
  })
  const [errors, setErrors] = useState<RegistrationErrors>({})
  const [successMessage, setSuccessMessage] = useState('')

  const { isSubmitting, apiError, submitRegistration } = useRegisterApi()

  const cities = useMemo(() => {
    return getCitiesByProvince(formData.province)
  }, [formData.province])

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target

    setFormData((previous) => {
      const next = {
        ...previous,
        [name]: value,
      }

      if (name === 'province') {
        next.city = ''
      }

      return next
    })

    setErrors((previous) => ({
      ...previous,
      [name]: '',
    }))
  }

  function validateForm() {
    const formErrors: RegistrationErrors = {}

    if (!formData.firstName.trim()) {
      formErrors.firstName = 'El nom es obligatori'
    }

    if (!formData.lastName.trim()) {
      formErrors.lastName = 'Els cognoms son obligatoris'
    }

    if (!isValidEmail(formData.email)) {
      formErrors.email = 'Email no valid'
    }

    if (!isValidPhone(formData.phone)) {
      formErrors.phone = 'Telefon no valid (9 digits)'
    }

    if (!isValidDateDDMMYYYY(formData.birthDate)) {
      formErrors.birthDate = 'Data no valida (DD/MM/YYYY)'
    }

    if (!isStrongPassword(formData.password)) {
      formErrors.password =
        'Minim 12 caracters amb almenys un numero i un caracter especial'
    }

    if (formData.confirmPassword !== formData.password) {
      formErrors.confirmPassword = 'La verificacio no coincideix'
    }

    if (!formData.address.trim()) {
      formErrors.address = 'L adreca es obligatoria'
    }

    if (!formData.province) {
      formErrors.province = 'Selecciona una provincia'
    }

    if (!formData.city) {
      formErrors.city = 'Selecciona una poblacio'
    }

    if (!isPostalCodeValidForProvince(formData.postalCode, formData.province)) {
      formErrors.postalCode = 'Codi postal no valid per a la provincia'
    }

    return formErrors
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSuccessMessage('')

    const formErrors = validateForm()

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    const response = await submitRegistration(formData)

    if (response) {
      setSuccessMessage('Registre enviat correctament (Register 1)')
      setFormData({ ...DEFAULT_FORM_VALUES })
      setErrors({})
    }
  }

  return (
    <div className="card shadow-sm p-4">
      <h1 className="h3 mb-3">Register 1 (manual)</h1>
      <p className="text-muted mb-4">Validacio amb useState i enviament a Fake API.</p>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="firstName">
              Nom
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              value={formData.firstName}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.firstName}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="lastName">
              Cognoms
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              value={formData.lastName}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.lastName}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="phone">
              Telefon
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              value={formData.phone}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.phone}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="birthDate">
              Data naiximent (DD/MM/YYYY)
            </label>
            <input
              id="birthDate"
              name="birthDate"
              type="text"
              placeholder="DD/MM/YYYY"
              className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
              value={formData.birthDate}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.birthDate}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="address">
              Adreca
            </label>
            <input
              id="address"
              name="address"
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              value={formData.address}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.address}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="password">
              Contrasenya
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="confirmPassword">
              Verificacio de contrasenya
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="province">
              Provincia
            </label>
            <select
              id="province"
              name="province"
              className={`form-select ${errors.province ? 'is-invalid' : ''}`}
              value={formData.province}
              onChange={handleChange}
            >
              <option value="">Selecciona</option>
              {PROVINCES.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.province}</div>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="city">
              Poblacio
            </label>
            <select
              id="city"
              name="city"
              className={`form-select ${errors.city ? 'is-invalid' : ''}`}
              value={formData.city}
              onChange={handleChange}
              disabled={!formData.province}
            >
              <option value="">Selecciona</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.city}</div>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="postalCode">
              Codi postal
            </label>
            <input
              id="postalCode"
              name="postalCode"
              type="text"
              className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
              value={formData.postalCode}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.postalCode}</div>
          </div>
        </div>

        <button className="btn btn-primary mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviant...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}

export default RegisterManualPage

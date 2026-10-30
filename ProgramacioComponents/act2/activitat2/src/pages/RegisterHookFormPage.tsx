import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCitiesByProvince, PROVINCES } from '../data/locations'
import { useRegisterApi } from '../hooks/useRegisterApi'
import { DEFAULT_FORM_VALUES, type RegistrationFormData } from '../types/registration'
import {
  isPostalCodeValidForProvince,
  isStrongPassword,
  isValidDateDDMMYYYY,
  isValidEmail,
  isValidPhone,
} from '../utils/validators'

function RegisterHookFormPage() {
  const [successMessage, setSuccessMessage] = useState('')
  const { isSubmitting, apiError, submitRegistration } = useRegisterApi()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    defaultValues: DEFAULT_FORM_VALUES,
  })

  const selectedProvince = watch('province')
  const selectedPassword = watch('password')
  const selectedCity = watch('city')

  const cities = useMemo(() => {
    return getCitiesByProvince(selectedProvince)
  }, [selectedProvince])

  useEffect(() => {
    if (selectedCity && !cities.includes(selectedCity)) {
      setValue('city', '')
    }
  }, [selectedCity, cities, setValue])

  async function onSubmit(data: RegistrationFormData) {
    setSuccessMessage('')

    const response = await submitRegistration(data)
    if (response) {
      setSuccessMessage('Registre enviat correctament (Register 2)')
      reset(DEFAULT_FORM_VALUES)
    }
  }

  return (
    <div className="card shadow-sm p-4">
      <h1 className="h3 mb-3">Register 2 (React Hook Form)</h1>
      <p className="text-muted mb-4">Validacio amb React Hook Form i Bootstrap.</p>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {apiError && <div className="alert alert-danger">{apiError}</div>}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="firstName-rhf">
              Nom
            </label>
            <input
              id="firstName-rhf"
              type="text"
              className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
              {...register('firstName', { required: 'El nom es obligatori' })}
            />
            <div className="invalid-feedback">{errors.firstName?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="lastName-rhf">
              Cognoms
            </label>
            <input
              id="lastName-rhf"
              type="text"
              className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
              {...register('lastName', { required: 'Els cognoms son obligatoris' })}
            />
            <div className="invalid-feedback">{errors.lastName?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="email-rhf">
              Email
            </label>
            <input
              id="email-rhf"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              {...register('email', {
                required: 'L email es obligatori',
                validate: (value) => isValidEmail(value) || 'Email no valid',
              })}
            />
            <div className="invalid-feedback">{errors.email?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="phone-rhf">
              Telefon
            </label>
            <input
              id="phone-rhf"
              type="text"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              {...register('phone', {
                required: 'El telefon es obligatori',
                validate: (value) => isValidPhone(value) || 'Telefon no valid (9 digits)',
              })}
            />
            <div className="invalid-feedback">{errors.phone?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="birthDate-rhf">
              Data naiximent (DD/MM/YYYY)
            </label>
            <input
              id="birthDate-rhf"
              type="text"
              placeholder="DD/MM/YYYY"
              className={`form-control ${errors.birthDate ? 'is-invalid' : ''}`}
              {...register('birthDate', {
                required: 'La data es obligatoria',
                validate: (value) =>
                  isValidDateDDMMYYYY(value) || 'Data no valida (DD/MM/YYYY)',
              })}
            />
            <div className="invalid-feedback">{errors.birthDate?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="address-rhf">
              Adreca
            </label>
            <input
              id="address-rhf"
              type="text"
              className={`form-control ${errors.address ? 'is-invalid' : ''}`}
              {...register('address', {
                required: 'L adreca es obligatoria',
              })}
            />
            <div className="invalid-feedback">{errors.address?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="password-rhf">
              Contrasenya
            </label>
            <input
              id="password-rhf"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register('password', {
                required: 'La contrasenya es obligatoria',
                validate: (value) =>
                  isStrongPassword(value) ||
                  'Minim 12 caracters amb almenys un numero i un caracter especial',
              })}
            />
            <div className="invalid-feedback">{errors.password?.message}</div>
          </div>

          <div className="col-md-6">
            <label className="form-label" htmlFor="confirmPassword-rhf">
              Verificacio de contrasenya
            </label>
            <input
              id="confirmPassword-rhf"
              type="password"
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
              {...register('confirmPassword', {
                required: 'Has de repetir la contrasenya',
                validate: (value) => value === selectedPassword || 'La verificacio no coincideix',
              })}
            />
            <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="province-rhf">
              Provincia
            </label>
            <select
              id="province-rhf"
              className={`form-select ${errors.province ? 'is-invalid' : ''}`}
              {...register('province', { required: 'Selecciona una provincia' })}
            >
              <option value="">Selecciona</option>
              {PROVINCES.map((province) => (
                <option key={province.name} value={province.name}>
                  {province.name}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.province?.message}</div>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="city-rhf">
              Poblacio
            </label>
            <select
              id="city-rhf"
              className={`form-select ${errors.city ? 'is-invalid' : ''}`}
              disabled={!selectedProvince}
              {...register('city', { required: 'Selecciona una poblacio' })}
            >
              <option value="">Selecciona</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">{errors.city?.message}</div>
          </div>

          <div className="col-md-4">
            <label className="form-label" htmlFor="postalCode-rhf">
              Codi postal
            </label>
            <input
              id="postalCode-rhf"
              type="text"
              className={`form-control ${errors.postalCode ? 'is-invalid' : ''}`}
              {...register('postalCode', {
                required: 'El codi postal es obligatori',
                validate: (value) =>
                  isPostalCodeValidForProvince(value, selectedProvince) ||
                  'Codi postal no valid per a la provincia',
              })}
            />
            <div className="invalid-feedback">{errors.postalCode?.message}</div>
          </div>
        </div>

        <button className="btn btn-primary mt-4" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviant...' : 'Registrar'}
        </button>
      </form>
    </div>
  )
}

export default RegisterHookFormPage


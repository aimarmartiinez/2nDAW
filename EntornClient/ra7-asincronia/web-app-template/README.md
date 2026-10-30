# 📘 Ruta de estudio — API REST + Frontend (Facturas)

## 🚀 1. Entender la arquitectura general

Antes de programar, ten clara la estructura:

### 🔙 Backend (`api/api.ts`)

Responsable de la lógica y los datos.

* Define endpoints REST:

  * `POST /facturas` → crear factura
  * `PUT /facturas/:id` → editar factura

### 🔜 Frontend (`web/main.ts`)

Responsable de la interacción con el usuario.

* Funciones principales:

  * `crearFactura()`
  * `editarFactura()`

👉 Su trabajo: recoger datos y llamar a la API

---

## 🌐 2. Dominar los métodos HTTP esenciales

* **POST**

  * Crear nuevos recursos
  * Envía datos en el `body`

* **PUT**

  * Actualizar recursos existentes
  * Requiere un `id`

### 📌 Ejemplo conceptual

```http
POST /facturas        # crear
PUT /facturas/123     # actualizar
```

---

## 🔌 3. Conectar frontend con backend

Uso de `fetch`:

```ts
fetch('/facturas', {
  method: 'POST',
  body: JSON.stringify(datos),
  headers: { 'Content-Type': 'application/json' }
})
```

### 📌 Claves

* Usar `JSON.stringify`
* Añadir headers correctamente
* Controlar la respuesta

---

## 🧠 4. Separación de responsabilidades

### 🖥️ Frontend

* Obtener datos del formulario
* Enviarlos al backend

### ⚙️ Backend

* Recibir datos
* Validarlos / procesarlos
* Guardarlos

---

## 🧩 5. Funciones clave

### ✍️ `getValuesFromInputs()`

Pasos:

1. Obtener el formulario
2. Leer inputs
3. Extraer valores
4. Crear objeto tipado (interfaz)
5. Devolverlo

---

### ➕ `crearFactura()`

* Usa `getValuesFromInputs()`
* Llama a `POST`
* ❗ No necesita ID

---

### ✏️ `editarFactura()`

* Usa `getValuesFromInputs()`
* Necesita ID
* Llama a `PUT`

---

## 🛡️ 6. Manejo de errores y feedback

```ts
try {
  const response = await fetch(...)
  alert('¡Acción realizada correctamente!')
} catch (err) {
  console.error('Error al realizar la acción')
}
```

### 📌 Buenas prácticas

* Usar `try/catch`
* Dar feedback al usuario

---

## 🏷️ 7. Nomenclatura recomendada

* Respuesta de fetch → `response`
* Datos → `data`
* Nombres claros y consistentes

---

## 🧬 8. Uso de interfaces

```ts
interface Factura {
  id: number
  nombre: string
  total: number
}
```

### 📌 Reglas

* Objeto único → `Promise<Factura>`
* Lista → `Promise<Factura[]>`
* Sin retorno → `Promise<void>`

---

## 🧭 9. Orden recomendado de aprendizaje

1. Entender arquitectura
2. Aprender métodos HTTP
3. Practicar `fetch`
4. Implementar `getValuesFromInputs`
5. Crear `crearFactura`
6. Crear `editarFactura`
7. Añadir manejo de errores
8. Tipar con interfaces

---

## ✅ Checklist rápido

* [ ] Entiendo la arquitectura frontend/backend
* [ ] Sé usar POST y PUT
* [ ] Sé hacer peticiones con fetch
* [ ] Puedo recoger datos de un formulario
* [ ] Sé crear una factura
* [ ] Sé editar una factura
* [ ] Manejo errores correctamente
* [ ] Uso interfaces en TypeScript

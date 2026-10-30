# Contacte App

Aplicación web sencilla para mostrar un formulario de contacto y validar sus datos en el servidor antes de aceptar el envío.

## Objetivo

Practicar el desarrollo de una aplicación de servidor con Node.js y Express, renderizar páginas mediante plantillas EJS y validar los datos recibidos desde un formulario.

## Stack

- Node.js
- Express 5
- EJS
- HTML y CSS

## Funcionalidades

- Muestra el formulario en `/contacte`; la ruta `/` redirige al formulario.
- Comprueba en el servidor que el nombre y los apellidos solo contengan letras y espacios.
- Comprueba que el teléfono tenga exactamente nueve dígitos.
- Limita la descripción a 250 caracteres.
- Si hay errores, vuelve a mostrar el formulario con los mensajes de validación y los valores introducidos.
- Si los datos son válidos, muestra una confirmación de envío.

## Aprendizajes

- Definir rutas GET y POST con Express.
- Recibir datos de formularios codificados como URL.
- Renderizar HTML en el servidor con EJS y pasarle datos desde las rutas.
- Validar entradas en el servidor y responder con un estado HTTP apropiado.
- Conservar los valores del formulario y mostrar errores para mejorar la experiencia de uso.

## Ejecución local

Requiere Node.js y npm. Desde esta carpeta, instala las dependencias e inicia el servidor:

```bash
npm install
node app.js
```

Abre [http://localhost:3000/contacte](http://localhost:3000/contacte) en el navegador.

import express from 'express'; /* Se debe reiniciar el archivo cada vez que querramos cargarlo*/
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); // para leer JSON del body

// Simulamos una base de datos
let mensajes = [];

// Ruta para recibir el formulario
app.post('/api/contact', (req, res) => {
  const { nombre, email, subject, mensaje } = req.body;

  if (!nombre || !email || !subject || !mensaje) {
    return res.status(400).json({ error: 'Por favor completa todos los campos.' });
  }
  const fecha = new Date();
  const opciones = { timeZone: 'Europe/Madrid', hour12: false };
  const hora = fecha.toLocaleTimeString('es-ES', opciones);
  const dia = fecha.toLocaleDateString('es-ES', opciones);
  const nuevoMensaje = { nombre, email, subject, mensaje, hora, dia };
  mensajes.push(nuevoMensaje);

  console.log('📩 Nuevo mensaje recibido:', nuevoMensaje);
  res.status(201).json({ message: '✅' });
});

// (Opcional) Ver los mensajes guardados
app.get('/api/contact', (req, res) => res.json(mensajes));

app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));

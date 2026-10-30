document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const signUpLinks = document.querySelectorAll('.sign-up');

  if (token) {

    signUpLinks.forEach(link => {
      link.textContent = 'Open';
      link.href = '/HTML/home_page.html'; //Por alguna razon me redirige a Login entonces modificamos el contenido del link
    });
  } else {

    signUpLinks.forEach(link => {
      link.textContent = 'Sign Up';
      link.href = '/HTML/login.html';
    });
  }
});

/*Formulario*/
const form = document.getElementById('contact-form');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    subject: form.subject.value,
    mensaje: form.mensaje.value,
  };

  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      resultado.textContent = result.message;
      resultado.style.color = 'green';
      form.reset();
    } else {
      resultado.textContent = result.error || 'Error al enviar el mensaje.';
      resultado.style.color = 'red';
    }
  } catch (err) {
    resultado.textContent = 'Error de conexión con el servidor.';
    resultado.style.color = 'red';
  }
});


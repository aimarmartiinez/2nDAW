


const container = document.getElementById('container');
const registerBtn = document.getElementById('register');/*Per a la transició de background*/
const loginBtn = document.getElementById('login');

const signUp=document.getElementById("sign-up");/*Per la funcionalitat backend */
const logIn=document.getElementById("log-in");

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});





async function sendLogin() {
  let user = document.forms.login.username.value; 
  let pass = document.forms.login.password.value;
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: user,
      password: pass
    })
  };

  const response = await fetch("http://localhost:3100/api/auth/login", config);
  const body = await response.json(); // 🔹 declarar local
  const token = body.token;            // 🔹 declarar local

  localStorage.setItem('token', token);
  console.log(body);
  window.location.href = '/HTML/home_page.html';
}
async function sendRegister() {
  let name = document.getElementById('regFullName').value;
  let user = document.getElementById('regUsername').value;
  // let email = document.getElementById('regEmail').value;
  let pass = document.getElementById('regPassword').value;
  let confirm = document.getElementById('regConfirm').value;

  if (pass !== confirm) {
    alert("Las contraseñas no coinciden");
  }

  let config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      fullname: name,
      username: user,
      password: pass
    })
  };

  let response = await fetch("http://localhost:3100/api/auth/register", config);
  let body = await response.json();
  console.log(body);

  if (body.token) {
    // registro correcto
    localStorage.setItem('token', body.token);
    window.location.href = '/HTML/home_page.html';
  } else {
    // registro fallido
    alert("Error en el registro. Intenta de nuevo.");
  }


}
/* Funcionalidad de redirección si la sesión está iniciada*/

const token=localStorage.getItem('token');

if(token){
  console.log(token);
    window.location.href = '/HTML/home_page.html';
}




signUp.addEventListener('click',() => {
  sendRegister();
});
logIn.addEventListener('click',() => {
  sendLogin();
});
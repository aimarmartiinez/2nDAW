function anade() {

  const lista = document.querySelector('#lista');
  const nuevoElemento = document.createElement('li');
  nuevoElemento.textContent = 'Nuevo elemento';
  if (lista)lista.appendChild(nuevoElemento);

}
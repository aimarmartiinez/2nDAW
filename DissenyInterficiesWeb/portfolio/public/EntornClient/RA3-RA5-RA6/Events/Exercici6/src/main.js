const title = document.getElementById('h1');

document.addEventListener('click', (event) => {
  const horizontal = event.clientX < window.innerWidth / 2 ? 'esquerra' : 'dreta';
  const vertical = event.clientY < window.innerHeight / 2 ? 'superior' : 'inferior';

  title.textContent = `Has clicat a la part ${vertical} ${horizontal}`;
});

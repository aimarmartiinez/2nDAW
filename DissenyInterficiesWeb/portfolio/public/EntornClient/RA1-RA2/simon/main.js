// Colores disponibles
const colors = ['green', 'red', 'yellow', 'blue'];

// Secuencia de la CPU
let CPUSequence = [];

// Secuencia del jugador
let playerSequence = [];

// Nivel actual
let level = 0;

// Iniciar juego
function startGame() {
    level = 0;
    CPUSequence = [];
    nextLevel();
}

// Avanzar nivel
function nextLevel() {
    level++;
    playerSequence = [];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    CPUSequence.push(randomColor);
    playSequence();
}

// Configurar clicks del jugador
document.querySelectorAll('.color').forEach(div => {
    div.addEventListener('click', () => {
        playerSequence.push(div.id);
        brightenColor(div.id);
        checkPlayerSequence();
    });
});

// Verificar secuencia del jugador
function checkPlayerSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== CPUSequence[i]) {
            alert('Game Over! Nivel alcanzado: ' + level);
            startGame();
            return;
        }
    }
    if (playerSequence.length === CPUSequence.length) {
        setTimeout(nextLevel, 1000);
    }
}

// Iluminar color temporalmente
function brightenColor(color) {
    const div = document.getElementById(color);
    div.classList.add('bright');
    setTimeout(() => div.classList.remove('bright'), 500);
}

// Reproducir secuencia CPU
function playSequence() {
    CPUSequence.forEach((color, index) => {
        setTimeout(() => {
            brightenColor(color);
        }, 1000 * index);
    });
}

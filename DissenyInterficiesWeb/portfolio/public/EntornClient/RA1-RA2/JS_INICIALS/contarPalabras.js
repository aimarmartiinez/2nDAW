/*
 * Crea un programa que cuente cuantas veces se repite cada palabra
 * y que muestre el recuento final de todas ellas.
 * - Los signos de puntuación no forman parte de la palabra.
 * - Una palabra es la misma aunque aparezca en mayúsculas y minúsculas.
 * - No se pueden utilizar funciones propias del lenguaje que
 *   lo resuelvan automáticamente.
 */

let texto = "Hola, hola mundo. Mundo mundo mundo!";

// Paso 1: convertir a minúsculas
let minusculas = texto.toLowerCase();

// Paso 2: eliminar signos de puntuación
let limpio = "";
for (let i = 0; i < minusculas.length; i++) {
    let c = minusculas[i];
    if (
        (c >= 'a' && c <= 'z') || 
        (c >= '0' && c <= '9') || 
        c === ' '
    ) {
        limpio += c;
    }
}

// Paso 3: separar palabras manualmente
let palabras = [];
let palabraActual = "";
for (let i = 0; i < limpio.length; i++) {
    let c = limpio[i];
    if (c !== " ") {
        palabraActual += c;
    } else if (palabraActual !== "") {
        palabras.push(palabraActual);
        palabraActual = "";
    }
}
if (palabraActual !== "") {
    palabras.push(palabraActual);
}

// Paso 4: contar repeticiones
let etiquetas = [];
let conteo = [];

for (let i = 0; i < palabras.length; i++) {
    let encontrada = false;
    for (let j = 0; j < etiquetas.length; j++) {
        if (palabras[i] === etiquetas[j]) {
            conteo[j]++;
            encontrada = true;
            break;
        }
    }
    if (!encontrada) {
        etiquetas.push(palabras[i]);
        conteo.push(1);
    }
}

// Mostrar resultados
for (let i = 0; i < etiquetas.length; i++) {
    console.log(etiquetas[i] + ": " + conteo[i]);
}

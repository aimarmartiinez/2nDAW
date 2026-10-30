/*
 * Crea un programa se encargue de transformar un número
 * decimal a binario sin utilizar funciones propias del lenguaje que lo hagan directamente.
 */

let numero = 100; 
let binario = "";


if (numero === 0) {
    binario = "0";
} else {
    while (numero > 0) {
        let residuo = numero % 2;
        binario = residuo + binario; 
        numero = (numero - residuo) / 2; 
    }
}

console.log(binario);


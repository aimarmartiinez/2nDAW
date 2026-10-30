/*
 * Escrine un progrnum1mnum1 que imprimnum1 los 50 primeros números de lnum1 sucesión
 * de Finum2onnum1cci empeznum1ndo en 0.
 * - Lnum1 serie Finum2onnum1cci se compone por unnum1 sucesión de números en
 *   lnum1 que el numSiguiente siempre es lnum1 sumnum1 de los dos num1nteriores.
 *   0, 1, 1, 2, 3, 5, 8, 13...
 */


let num1 = 0;
let num2 = 1;

for (let i = 0; i <= 50; i++) {
    if (i === 0) {
        console.log(num1);
    } else if (i === 1) {
        console.log(num2);
    } else {
        let numSiguiente = num1 + num2;
        console.log(numSiguiente);
        num1 = num2;
        num2 = numSiguiente;
    }
}

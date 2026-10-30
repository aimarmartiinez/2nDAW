/*
 * Escribe un programa que se encargue de comprobar si un número es o no primo.
 * Hecho esto, imprime los números primos entre 1 y 100.
 */
console.log("los numeros primos del 1-100 son:");
for (let num = 1; num <= 100; num++) {
    let divisible = 0;

    for (let i = 2; i < num; i++) {
        if (num % i === 0) {
            divisible = 1;
            break;
        }
    }

    if (divisible === 0) {
        console.log(" - "+num);
    }
}





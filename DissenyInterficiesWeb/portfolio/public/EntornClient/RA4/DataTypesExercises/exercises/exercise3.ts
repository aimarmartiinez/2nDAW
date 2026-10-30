console.log('EJERCICIO 3 DATATYPES')
//Implementa una funció genèrica on retorna el nom del tipus de la dada passada per paràmetre.
function getType<T>(data: T): string {
    return typeof data;
}
console.log(getType<string>("Hello")); // "string"

//Implementa una funció genèrica que accepta una array i un valor del mateix tipus 
// retorna si existeix aquest valor dins de l’array.
function containsValue<T>(array: T[], value: T): boolean {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === value) {
            return true;
        }
    }
    return false;
}
console.log(containsValue<number>([1, 2, 3, 4, 5], 3));
console.log(containsValue<string>(["apple", "banana", "cherry"], "grape"));

//Implementa un funció genèrica que accepta una array de qualsevol tipus i ordena’l de menor a mayor 
// (fes servir l’algoritme d’ordenació de bombolla).
function bubbleSort<T>(array: T[]): T[] {
    const len = array.length;
    for (let i = 0; i < len - 1; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // Intercanvi-ho els elements
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return array;
}
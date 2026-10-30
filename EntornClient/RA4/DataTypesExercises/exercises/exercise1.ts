console.log('EJERCICIO 1 DATATYPES')
let str: string = 'Hello World!';
let num: number = 7;
console.log('el valor de str és: ' + str);
console.log('el valor de num és: ' + num);

/*let bigint : bigint = 1000000000000n;
let suma = bigint + num;
console.log('la suma de bigint i num és: ' + suma);*/
// Operator '+' cannot be applied to types 'bigint' and 'number'

let arrayNum: number[] = [-3, -2, -1, 0, 1, 2, 3, 4, 5];
for (let i = 0; i < arrayNum.length; i++) {
    let isMajor: boolean = arrayNum[i] > 0;
    if (isMajor) {
        console.log('el número ' + arrayNum[i] + ' és major que 0');
    }
}
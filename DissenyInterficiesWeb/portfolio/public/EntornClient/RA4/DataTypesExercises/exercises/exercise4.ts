console.log('EJERCICIO 4 DATATYPES')
/*Crea un type alias amb el nom de UserName de tipus string i 
crea una variable amb el alias creat i assigna-li un valor.
Intenta fer un console.log de la variable creada.
*/

type UserName = string;
const user: UserName = 'Aimar'
console.log(user)

/*
    Crea un type alias per a un objecte que representi un usuari amb les següents atributs: 
    id (number) nom (string) email (string). 
    Després, crea un array d'usuaris utilitzant aquest type alias i 
    una funció que accepti un usuari i retorni un string amb el seu nom i correu.
*/

type Usuari = {
    id: number,
    nom: string,
    email: string
}
const usuaris: Usuari[] = [
    { id: 1, nom: "Aimar", email: "aimar@gmail.com" },
    { id: 2, nom: "Joel", email: "joel@gmail.com" }
];

// Funció que accepta un usuari i retorna nom i correu
function mostrarUsuari(u: Usuari): string {
    return `Nom: ${u.nom}, Correu: ${u.email}`;
}

// Exemple d'ús
console.log(mostrarUsuari(usuaris[0])); 
console.log(mostrarUsuari(usuaris[1]));

// Type alias para triángulo
type Triangle = {
    base: number;
    height: number;
};

// Type alias para círculo
type Circle = {
    radius: number;
};

function calculateArea(shape: Triangle | Circle): number {
    if ('base' in shape && 'height' in shape) {
        // Es un triángulo
        return (shape.base * shape.height) / 2;
    } else {
        // Es un círculo
        return Math.PI * shape.radius * shape.radius;
    }
}


const triangle: Triangle = { base: 10, height: 5 };
const circle: Circle = { radius: 3 };

console.log('Área del triángulo: ' + calculateArea(triangle));
console.log('Área del círculo: ' + calculateArea(circle));     


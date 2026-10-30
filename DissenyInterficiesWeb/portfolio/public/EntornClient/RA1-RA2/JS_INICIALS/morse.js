let entrada = ".... ——— .—.. .—   —— ..— —. —.. ———";
let morse = {
    "a": ".—",    "b": "—...",  "c": "—.—.",  "d": "—..",   "e": ".",     "f": "..—.",
    "g": "——.",   "h": "....",  "i": "..",    "j": ".———",  "k": "—.—",   "l": ".—..",
    "m": "——",    "n": "—.",    "o": "———",   "p": ".——.",  "q": "——.—",  "r": ".—.",
    "s": "...",   "t": "—",     "u": "..—",   "v": "...—",  "w": ".——",   "x": "—..—",
    "y": "—.——",  "z": "——..",
    "0": "—————", "1": ".————", "2": "..———", "3": "...——", "4": "....—",
    "5": ".....", "6": "—....", "7": "——...", "8": "———..", "9": "————.",
    ".": ".—.—.—", ",": "——..——", "?": "..——..", "!": "—.—.——", " ": " "
};

let texto = {};
for (let clave in morse) {
    texto[morse[clave]] = clave;
}

function esMorse(str) {
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (c !== "." && c !== "—" && c !== " ") {
            return false;
        }
    }
    return true;
}

function aMorse(str) {
    str = str.toLowerCase();
    let resultado = "";
    for (let i = 0; i < str.length; i++) {
        let c = str[i];
        if (morse[c]) {
            resultado += morse[c] + " ";
        }
    }
    return resultado.trim();
}


function aTexto(str) {
    let palabras = str.split("  "); // Separar por doble espacio
    let resultado = "";
    for (let i = 0; i < palabras.length; i++) {
        let letras = palabras[i].split(" ");
        for (let j = 0; j < letras.length; j++) {
            if (texto[letras[j]]) {
                resultado += texto[letras[j]];
            }
        }
        resultado += " ";
    }
    return resultado.trim();
}

// Ejecutar conversión
let salida = esMorse(entrada) ? aTexto(entrada) : aMorse(entrada);
console.log(salida);

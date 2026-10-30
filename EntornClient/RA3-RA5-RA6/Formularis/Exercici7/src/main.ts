/*
    En el ejemplo anterior, con cada tecla pulsada se compara el número total de caracteres del textarea 
    con el máximo número de caracteres permitido. 
    Si el número de caracteres es igual o mayor que el límite, se devuelve el valor false y por tanto, 
    se evita el comportamiento por defecto de onkeypress y la tecla no se añade.

    Ejercicio 17
    Mejorar el ejemplo anterior indicando en todo momento al usuario el número de caracteres que aún puede escribir. 
    Además, se debe permitir pulsar las teclas Backspace, Supr. 
    y las flechas horizontales cuando se haya llegado al máximo número de caracteres.
*/

const MAX_CHARACTERS = 10;
const element = document.getElementById("text") as HTMLTextAreaElement | null;
const count = document.getElementById("count") as HTMLSpanElement | null;

if (element && count) {
    updateCount();

    element.addEventListener("keydown", (event) => {
        const allowKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        const hasSelection = element.selectionStart !== element.selectionEnd;
        const isLimit = element.value.length >= MAX_CHARACTERS;
        const isShortcut = event.ctrlKey || event.metaKey || event.altKey;

        if (allowKeys.includes(event.key) || isShortcut || hasSelection) {
            return;
        }

        if (isLimit) {
            event.preventDefault();
        }
    });

    element.addEventListener("input", () => {
        if (element.value.length > MAX_CHARACTERS) {
            element.value = element.value.slice(0, MAX_CHARACTERS);
        }
        updateCount();
    });
}

function updateCount(): void {
    if (!element || !count) return;
    const remainingCharacters = MAX_CHARACTERS - element.value.length;
    count.textContent = `remaining characters: ${remainingCharacters}`;
}


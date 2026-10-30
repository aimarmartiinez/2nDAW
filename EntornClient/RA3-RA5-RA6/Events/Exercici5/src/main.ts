document.addEventListener("mousemove", (event) => {
    const missatge = `
        Esdeveniment: moviment del ratolí<br>
        Navegador: X=${event.clientX}, Y=${event.clientY}<br>
        Pàgina: X=${event.pageX}, Y=${event.pageY}
    `;
    mostraInformacio(missatge, "white");
});

document.addEventListener("mousedown", (event) => {
    const missatge = `
        Esdeveniment: botó del ratolí premut<br>
        Navegador: X=${event.clientX}, Y=${event.clientY}<br>
        Pàgina: X=${event.pageX}, Y=${event.pageY}
    `;
    mostraInformacio(missatge, "#FFFFCC");
});

document.addEventListener("keydown", () => {
    const missatge = `
        Esdeveniment: tecla premuda
    `;
    mostraInformacio(missatge, "#CCE6FF");
});

function mostraInformacio(missatge: string, colorFons: string) {
    const infoDiv = document.getElementById("info");

    if (infoDiv) {
        const h1 = infoDiv.querySelector("h1");
        if (h1) {
            h1.innerHTML = missatge;
            infoDiv.style.backgroundColor = colorFons;
        }
    }
}

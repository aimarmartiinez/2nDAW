function muestra():void {
    const elementos = document.querySelectorAll(".oculto");
    
    elementos.forEach((elemento) => {
        elemento.classList.add("visible");
    });
}
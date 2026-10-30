
const links = document.getElementsByTagName("a");

for (let i = 0; i < links.length; i++) {
    const link = links[i];
    //ex: "contenidos_1", "contenidos_2", ...
    const contentId = "contenidos_" + (i + 1);
    const content = document.getElementById(contentId);

    if(content){

        link.addEventListener("click", function (event) {
            if (content.classList.contains("oculto")) {
                content.classList.remove("oculto");
                link.innerHTML = "Ocultar contenidos";
            } else {
                content.classList.add("oculto");
                link.innerHTML = "Mostrar contenidos";
            }
        });
    }
}

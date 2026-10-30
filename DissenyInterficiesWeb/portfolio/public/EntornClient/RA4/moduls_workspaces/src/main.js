function toggleTheme(element) {
    const backgroundDark = "#1e1e1e";
    const textDark = "#ffffff";
    const backgroundLight = "#ffffff";
    const textLight = "#000000";
    const currentBg = element.style.backgroundColor;

    if (currentBg === backgroundLight || currentBg === "") {
        element.style.backgroundColor = backgroundDark;
        element.style.color = textDark;
    } else {
        element.style.backgroundColor = backgroundLight;
        element.style.color = textLight;
    }
}

const div = document.getElementById("app");

if (div) {
    div.style.fontFamily = "Arial, sans-serif";
    div.style.padding = "24px";
    div.innerHTML = `
        <h1>Moduls i Workspaces</h1>
        <p>Aquest exemple canvia el tema amb una funcio importada en TypeScript.</p>
        <button id="theme-button">Canviar tema</button>
    `;

    const button = document.getElementById("theme-button");

    if (button) {
        button.addEventListener("click", () => toggleTheme(div));
    }

    toggleTheme(div);
}

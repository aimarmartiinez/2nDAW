export const backgroundDark = "#1e1e1e";
export const textDark = "#ffffff";

export const backgroundLight = "#ffffff";
export const textLight = "#000000";

export function ToggleTheme(element: HTMLElement): void {
    const currentBg = element.style.backgroundColor;

    if (currentBg === backgroundLight || currentBg === "") {
        element.style.backgroundColor = backgroundDark;
        element.style.color = textDark;
    } 
    else {
        element.style.backgroundColor = backgroundLight;
        element.style.color = textLight;
    }
}

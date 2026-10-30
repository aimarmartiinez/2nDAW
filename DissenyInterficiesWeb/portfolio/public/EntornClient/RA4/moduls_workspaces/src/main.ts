import { ToggleTheme } from "./exercises/darker";

const div = document.getElementById("app") as HTMLElement;

ToggleTheme(div); // cambia a dark
ToggleTheme(div); // vuelve a light

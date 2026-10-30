document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        html.setAttribute("data-theme", "dark");
    } else {
        html.setAttribute("data-theme", "light");
    }

    const themeToggleBtn = document.querySelector(".theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        });
    }
});

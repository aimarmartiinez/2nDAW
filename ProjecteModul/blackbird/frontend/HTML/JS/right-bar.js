
function generarRightbar() {
    const aside = document.createElement('aside');
    aside.className = 'right-bar';

    aside.innerHTML = `
        <section class="trending-topics">
            <h2>Trending Topics</h2>
            <ul>
                <li>#Topic 1</li>
                <li>#Topic 2</li>
                <li>#Topic 3</li>
            </ul>
        </section>

        <section class="who-to-follow">
            <h2>Who to Follow</h2>
            <ul>
                <li>Profile 1</li>
                <li>Profile 2</li>
                <li>Profile 3</li>
            </ul>
        </section>

        <button class="theme-toggle"><img src="Images/theme.svg" alt="Mode"></button>
    `;

    document.body.appendChild(aside);
}
document.addEventListener('DOMContentLoaded', function() {
    generarRightbar();
});
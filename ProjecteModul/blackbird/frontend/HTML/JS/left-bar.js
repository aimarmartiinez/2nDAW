function generarLeftbar() {
    const aside = document.createElement('aside');
    aside.className = 'left-bar';

    aside.innerHTML = `
        <a id="logo-link" href="./LandingPage.html">
            <div class="brand">
                <img src="Images/logo2.png" alt="BlackBird Logo">
                <h1>BlackBird</h1>
            </div>
        </a>
        <nav>
            <ul>
                <li><a href="home_page.html" data-page="home_page.html">Home</a></li>
                <li><a href="explore.html" data-page="explore.html">Explore</a></li>
                <li><a href="notifications.html" data-page="notifications.html">Notifications</a></li>
                <li><a href="messages.html" data-page="messages.html">Messages</a></li>
                <li><a href="premium.html" data-page="premium.html">Premium</a></li>
                <li><a href="profile.html" data-page="profile.html">Profile</a></li>
            </ul>
        </nav>
        <div class="profile">
            <img src="Images/profile.png" alt="Profile">
            <div class="profile-info">
                <h4>User</h4>
                <h5>@username</h5>
            </div>
            <div class="profile-drop">
                <a id="logout" href="./signIn.html">Cerrar sesión</a>
                <a href="profile.html">View Profile</a>
            </div>
        </div>
    `;

    document.body.appendChild(aside);
}
/*Boton logout*/
document.addEventListener('DOMContentLoaded', () => {
    generarLeftbar();
    const logout = document.getElementById("logout");
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        if (!localStorage.getItem('token')) {
            console.log("Token borrado");
        } else {
            console.log("Token sigue existiendo ❌");
        } 

        setTimeout(() => {
            window.location.href = "./signIn.html";
        }, 1000);

    });
});


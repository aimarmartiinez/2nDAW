function getForm(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar el formulario

    // Obtenemos los valores escritos en el formulario
    const title = document.getElementById('postTitle').value.trim();
    const body = document.getElementById('postBody').value.trim();

    // Validamos que el usuario no haya dejado los campos vacíos
    if (!title || !body) {
        alert('Por favor, completa el título y el contenido del post.');
        return;
    }

    // Guardamos los datos en una variable objeto
    const postData = { title, body };

    // Llamamos a la función que lo enviará a la base de datos
    sendFormToDataBase(postData);


}

async function sendFormToDataBase(postData) {
    const token = localStorage.getItem('token'); // Recuperamos el token guardado al hacer login

    // Petición HTTP POST al backend
    const response = await fetch('http://localhost:3100/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token // Necesario para identificar qué usuario está publicando
        },
        body: JSON.stringify(postData)
    });

    // Si el servidor responde correctamente
    if (response.ok) {

        getPosts();
        // Limpia el formulario
        document.getElementById('createPost').reset();

    } else {
        const error = await response.json().catch(() => null);
        console.error('Error al crear post:', error);
        alert('Error al crear el post. Inténtalo de nuevo.');
    }
}

async function getPosts() {
    const token = localStorage.getItem('token');
    console.log(token);

    const response = await fetch('http://localhost:3100/api/posts', {
        method: "GET",
        headers: { "Authorization": token }
    });

    const posts = await response.json();
    const section = document.querySelector('.last-posts');


    // Limpiar la sección antes de añadir posts
    let html = '';


    for (const post of posts) {
        html += `
                <article class="post" data-post-id="${post.id}">
                    <div class="post-header">
                        <img src="${post.avatar}" alt="avatar" class="avatar">
                        <h3 class="user">@${post.userName}</h3>
                        <p class="time">${post.createdAt}</p>
                    </div>
                    <h4 class="title">${post.title}</h4>
                    <p class="body">${post.body}</p>
                    <div class="post-footer">
                        <button class="like-btn">
                            <img src="./Images/like-empty.svg" alt="like" class="like-icon">
                        </button>
                        <span class="like-count">${post.likeCount||0}</span>
                    </div>
                    <div class="comments">
                        <button class="openComments">Mostrar comentarios</button>
                        <div class="showComments"></div>
                    </div>
                </article>
            `;
    }
    section.innerHTML = html;


    

    document.querySelectorAll('.post').forEach(postElement => {
        /*Likes*/
        const likebtn = postElement.querySelector('like-btn');
        const likeCount = postElement.querySelector('like-count');
        const likeIcon= postElement.querySelector('like-icon')

        likebtn.addEventListener('click', async()=> {
            likebtn.classList.toggle('liked');
            if(postElement.querySelector('like-btn .liked')){
                likeCount +=1;
                likeIcon.setAttribute("src","./Images/like-filled.svg")
            }
        })


        /*Comentarios*/
        const btn = postElement.querySelector('.openComments');
        const commentsBox = postElement.querySelector('.showComments');
        btn.addEventListener('click', async () => {
            const postId = postElement.dataset.postId;


            commentsBox.classList.toggle('active');

            const response = await fetch(`http://localhost:3100/api/posts/${postId}/comments`, {
                headers: { "Authorization": localStorage.getItem('token') }
            });
            const comments = await response.json();

            commentsBox.innerHTML = '';

            for (const c of comments) {
                commentsBox.innerHTML += `
            <div class="comment">
                <div class="comment-header">
                    <p class="comment-user">@${c.user?.userName || 'Usuario desconocido'}</p>
                </div>
                <p class="comment-body">${c.body}</p>
            </div>
        `;
            }
        });

    });

}





// Inicialización al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    getPosts(); // Carga los posts existentes

    // Capturamos el envío del formulario
    const form = document.getElementById('createPost');
    form.addEventListener('submit', getForm);
});

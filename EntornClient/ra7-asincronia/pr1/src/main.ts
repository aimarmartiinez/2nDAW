import "./style.css";

type User = {
  id: number;
  name: string;
  username: string;
};

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type Comment = {
  postId: number;
};

const API_BASE = "https://jsonplaceholder.typicode.com";
const POSTS_LIMIT = 12;
const postsElement = document.querySelector<HTMLElement>("#posts");

if (!postsElement) {
  throw new Error("No s'ha trobat #posts a l'HTML.");
}

const postsContainer: HTMLElement = postsElement;

export async function getPage(url: string): Promise<unknown> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status} a ${url}`);
  }

  return response.json();
}

function renderStatus(message: string, isError = false): void {
  postsContainer.innerHTML = `<p class="status${isError ? " error" : ""}">${message}</p>`;
}

function createCard(
  post: Post,
  userName: string,
  userSeed: string,
  commentsCount: number,
): string {
  const avatarUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(userSeed)}`;

  return `
    <article class="post-card">
      <img class="avatar" src="${avatarUrl}" alt="Avatar de ${userName}" loading="lazy" />
      <div class="content">
        <h2 class="author">${userName}</h2>
        <p class="title">${post.title}</p>
        <p class="body">${post.body}</p>
        <p class="meta"><span class="comment-icon" aria-hidden="true">o</span>${commentsCount}</p>
      </div>
    </article>
  `;
}

async function init(): Promise<void> {
  renderStatus("Carregant dades...");

  try {
    const posts = (await getPage(`${API_BASE}/posts?_limit=${POSTS_LIMIT}`)) as Post[];
    const users = (await getPage(`${API_BASE}/users`)) as User[];
    const comments = (await getPage(`${API_BASE}/comments`)) as Comment[];

    const cards = posts.map((post) => {
      const user = users.find((item) => item.id === post.userId);
      const userName = user ? user.name : "Usuari desconegut";
      const userSeed = user ? user.username : `user-${post.userId}`;
      const commentsCount = comments.filter((item) => item.postId === post.id).length;

      return createCard(post, userName, userSeed, commentsCount);
    });

    postsContainer.innerHTML = cards.join("");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No s'han pogut carregar les dades.";
    renderStatus(message, true);
  }
}

void init();

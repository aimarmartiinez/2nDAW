# Dashboard E-commerce amb BI

Projecte d'Entorn de Servidor (2n DAW) desenvolupat amb Node.js, Express i EJS.
L'aplicació sincronitza dades d'una API pública (Fake Store API), les guarda en memòria i mostra estadistiques de BI en un dashboard visual amb Chart.js.

## Objectiu del projecte
Aquest projecte simula un petit entorn de Business Intelligence sobre un catàleg e-commerce.
L'objectiu principal és:
- Consumir dades externes d'usuaris i productes.
- Exposar una API pròpia amb aquestes dades.
- Calcular insights útils (metriques agregades).
- Visualitzar-los en un dashboard web.

## Tecnologies utilitzades
- Node.js
- Express
- EJS
- Axios
- Chart.js

## Estructura del projecte
- `app.js`: punt d'entrada del servidor, configuració general i ruta del dashboard.
- `routes/api.js`: endpoints REST (`/api/users`, `/api/products`, `/api/stats`).
- `routes/sync.js`: ruta `/sync` per sincronitzar dades de Fake Store API.
- `models/User.js`: model simple en memòria d'usuaris.
- `models/Product.js`: model simple en memòria de productes.
- `utils/buildStats.js`: càlcul de metriques BI compartides.
- `middleware/logger.js`: middleware per registrar les peticions HTTP.
- `views/dashboard.ejs`: vista principal del dashboard.
- `views/partials/header.ejs`: capçalera reutilitzable.
- `public/css/style.css`: estils del dashboard.
- `public/js/dashboard.js`: lògica dels gràfics al client.

## Requisits previs
- Node.js instal·lat (recomanat v18 o superior)
- npm

## Instal�laci�
```bash
npm install
```

## Execuci�
```bash
node app.js
```
Servidor disponible a:
- `http://localhost:3000`

## Flux d'�s recomanat
1. Inicia el servidor.
2. Executa sincronització per carregar dades externes:
```bash
GET /sync
```
3. Obre el dashboard:
```bash
GET /dashboard
```
4. Comprova l'API propia:
```bash
GET /api/users
GET /api/products
GET /api/stats
```

## Endpoints disponibles
- `GET /dashboard`
  - Mostra el dashboard amb targetes i gràfics.
- `GET /sync`
  - Crida Fake Store API (`/products` i `/users`), transforma dades i actualitza models en memòria.
- `GET /api/users`
  - Retorna la llista actual d'usuaris.
- `GET /api/products`
  - Retorna la llista actual de productes.
- `GET /api/stats`
  - Retorna métriques BI agregades en format JSON.

## Insights BI implementats
Actualment el dashboard mostra aquests insights:
- Distribució de productes per categoria.
- Top 5 productes per preu.
- Preu mitjà global de productes.
- Totals bàsics d'usuaris i productes.

## Funcionament intern de les estad�stiques
La lògica BI està centralitzada a `utils/buildStats.js` per evitar duplicar codi:
- El dashboard (`/dashboard`) utilitza aquesta funció per pintar dades.
- L'endpoint (`/api/stats`) utilitza la mateixa funció per retornar JSON.

Això garanteix consistència: la informació visual i la de l'API surt del mateix càlcul.

## Middleware logger
`middleware/logger.js` registra a consola cada petició amb data, hora, métode i URL.
Exemple:
```text
[01/03/2026 18:24:31] GET /dashboard
```
És útil per depurar i veure el flux real de navegació i API.

## Historial de commits (resum del progr�s)
- `9115cce` - `feat(app): bootstrap express server`
  - Es crea el servidor Express i l'arrencada inicial.
- `7b9701a` - `feat(ui): render dashboard with ejs partial header and base styles`
  - Configuració EJS, primera vista funcional i estils base.
- `6ed7138` - `feat(product/user): add mock product/user model and products/users endpoint`
  - Models mock i primers endpoints de recursos.
- `34fa6e3` - `feat(stats): add /api/stats endpoint and load dashboard metrics from models`
  - Primer endpoint de metriques i ús de dades al dashboard.
- `643eae4` - `feat(sync): add /sync route to fetch and refresh users/products from fakestoreapi`
  - Sincronització amb API externa i refresc de dades locals.
- `a3f8e47` - `refactor(routes): add /dashboard route and redirect root path`
  - Separació clara de ruta principal `/dashboard`.
- `6fce841` - `feat(dashboard): add BI stats and chart visualization`
  - Integració de BI i gràfics amb Chart.js.
- `8ee4b07` - `feat(middleware): add request logger and register it globally`
  - Middleware logger global per observabilitat bàsica.
- `693ff00` - `refactor(stats): centralize BI stats logic for dashboard and api`
  - Refactor per centralitzar càlculs BI en un únic módul.

## Estat actual
Projecte funcional amb:
- sincronització de dades externes,
- API REST pròpia,
- visualització BI en dashboard,
- estructura modular i mantenible.

## Millores futures (opcional)
- Persistència real en BD (MongoDB/MySQL) en lloc de memòria.
- Més insights BI (p. ex. preu mitjà per categoria).
- Millora de validacions i tests automatitzats.

---

## Què vaig aprendre (portfolio DAW)

- Consumir una **API externa** (Fake Store) i sincronitzar dades amb `/sync`
- Dissenyar una **API REST pròpia** (`/api/users`, `/api/products`, `/api/stats`)
- Models en memòria i càlcul de **mètriques BI** (`buildStats.js`)
- Visualització amb **Chart.js** en vistes EJS
- Arquitectura modular Express: routes, middleware, models, utils
- Flux complet: sync → API → dashboard visual

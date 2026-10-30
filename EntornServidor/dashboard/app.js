const express = require('express');
const path = require('path');
const apiRouter = require('./routes/api');
const syncRouter = require('./routes/sync');
const logger = require('./middleware/logger');
const buildStats = require('./utils/buildStats');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger);
app.use('/api', apiRouter);
app.use('/', syncRouter);

const users = require('./models/User');
const products = require('./models/Product');

app.get('/', (req, res) => {
  res.redirect('/dashboard');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    title: 'Dashboard',
    stats: buildStats(users, products)
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');

const app = express();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware per parsejar request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Fitxers estàtics
app.use(express.static(path.join(__dirname, 'public')));

// Middleware de logging
app.use(logger);

// Routes
const indexRouter = require('./routes/index');
const notesRouter = require('./routes/notes');

app.use('/', indexRouter);
app.use('/notes', notesRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).render('error', { title: 'No trobat', message: 'Pàgina no trobada' });
});

module.exports = app;

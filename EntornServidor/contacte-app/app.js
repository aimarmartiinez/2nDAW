const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false }));

const onlyLetters = (value) => /^[A-Za-zÀ-ÿ\s]+$/.test(value);
const onlyDigits = (value) => /^\d+$/.test(value);
app.use(express.static('public'));
app.get('/contacte', (req, res) => {
    res.render('contacte', { errors: {}, values: {} });
});

app.post('/contacte', (req, res) => {
    const { nom, cognoms, telefon, descripcio } = req.body;
    const errors = {};
    const values = { nom, cognoms, telefon, descripcio };

    if (!nom || !onlyLetters(nom)) {
        errors.nom = 'El nom només pot contenir lletres.';
    }

    if (!cognoms || !onlyLetters(cognoms)) {
        errors.cognoms = 'Els cognoms només poden contenir lletres.';
    }

    if (!telefon || !onlyDigits(telefon) || telefon.length !== 9) {
        errors.telefon = 'El telèfon ha de tenir 9 dígits i només números.';
    }

    if (!descripcio || descripcio.length > 250) {
        errors.descripcio = 'La descripció no pot superar 250 caràcters.';
    }

    if (Object.keys(errors).length > 0) {
        return res.status(422).render('contacte', { errors, values });
    }

    return res.send('Consulta enviada correctament.');
});

app.get('/', (req, res) => {
  res.redirect('/contacte');
});

app.listen(3000, () => {
    console.log('Servidor en marxa a http://localhost:3000');
});  
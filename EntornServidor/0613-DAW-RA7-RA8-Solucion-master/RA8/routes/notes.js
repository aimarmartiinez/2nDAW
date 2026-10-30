const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// GET /notes - Llistar totes les notes ✅
router.get('/', noteController.index);

// GET /notes/create - Mostrar formulari de creació ✅
router.get('/create', noteController.showCreateForm);

// SOLUCIÓ TODO 1: Ruta POST per crear una nota
// El router ja està muntat a /notes, per tant la ruta dins del router és '/'
router.post('/', noteController.create);

// GET /notes/:id - Mostrar una nota ✅
router.get('/:id', noteController.show);

// POST /notes/:id/toggle - Canviar estat de la nota
router.post('/:id/toggle', noteController.toggleComplete);

// POST /notes/:id/delete - Eliminar una nota ✅
router.post('/:id/delete', noteController.delete);

module.exports = router;

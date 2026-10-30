const Note = require('../models/Note');

const noteController = {
    /**
     * Llistar totes les notes ✅
     */
    index: (req, res) => {
        const notes = Note.getAll();
        res.render('notes/index', { title: 'Les meves Notes', notes });
    },

    /**
     * Mostrar formulari de creació ✅
     */
    showCreateForm: (req, res) => {
        res.render('notes/create', { title: 'Crear Nota', errors: [] });
    },

    /**
     * SOLUCIÓ TODO 2: Crear una nota amb validació
     */
    create: (req, res) => {
        const { title, content, category, priority } = req.body;
        const errors = [];

        if (!title) errors.push('Title is required');
        if (!content) errors.push('Content is required');

        if (errors.length > 0) {
            return res.render('notes/create', { title: 'Crear Nota', errors });
        }

        Note.create({ title, content, category, priority });
        res.redirect('/notes');
    },

    /**
     * Mostrar una nota individual ✅
     */
    show: (req, res) => {
        const note = Note.getById(req.params.id);
        if (!note) {
            return res.status(404).render('error', { title: 'No trobat', message: 'Nota no trobada' });
        }
        res.render('notes/show', { title: note.title, note });
    },

    /**
     * SOLUCIÓ TODO 5: Toggle complete amb async/await
     */
    toggleComplete: async (req, res) => {
        const note = await new Promise((resolve) => {
            setTimeout(() => resolve(Note.toggleComplete(req.params.id)), 100);
        });

        if (!note) {
            return res.status(404).send('Not found');
        }

        res.redirect('/notes');
    },

    /**
     * Eliminar una nota ✅
     */
    delete: (req, res) => {
        Note.delete(req.params.id);
        res.redirect('/notes');
    },
};

module.exports = noteController;

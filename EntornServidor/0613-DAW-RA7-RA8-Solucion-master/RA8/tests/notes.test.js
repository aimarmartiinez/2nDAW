const request = require('supertest');
const app = require('../app');
const Note = require('../models/Note');

// Reiniciar les notes abans de cada test
beforeEach(() => {
    Note.reset();
});

/*
|--------------------------------------------------------------------------
| Tests per al Gestor de Notes
|--------------------------------------------------------------------------
|
| Aquests tests validen la implementació dels 5 TODOs.
| Executa: docker-compose exec app npm test
|
*/

// =============================================
// TEST TODO 1: La ruta POST /notes existeix
// =============================================

describe('TODO 1: POST /notes route', () => {
    test('POST /notes ha de crear una nota i redirigir a /notes', async () => {
        const res = await request(app)
            .post('/notes')
            .send({
                title: 'Test Note',
                content: 'Test content',
                category: 'General',
                priority: 'high'
            });

        expect(res.status).toBe(302);
        expect(res.headers.location).toBe('/notes');
        expect(Note.getAll()).toHaveLength(1);
        expect(Note.getAll()[0].title).toBe('Test Note');
    });

    test('POST /notes no ha de retornar 404', async () => {
        const res = await request(app)
            .post('/notes')
            .send({
                title: 'Test',
                content: 'Content'
            });

        expect(res.status).not.toBe(404);
    });
});

// =============================================
// TEST TODO 2: Funció create amb validació
// =============================================

describe('TODO 2: Note creation with validation', () => {
    test('ha de mostrar error quan el títol està buit', async () => {
        const res = await request(app)
            .post('/notes')
            .send({ title: '', content: 'Some content' });

        expect(res.status).toBe(200);
        expect(res.text).toContain('Title is required');
        expect(Note.getAll()).toHaveLength(0);
    });

    test('ha de mostrar error quan el contingut està buit', async () => {
        const res = await request(app)
            .post('/notes')
            .send({ title: 'Some title', content: '' });

        expect(res.status).toBe(200);
        expect(res.text).toContain('Content is required');
        expect(Note.getAll()).toHaveLength(0);
    });

    test('ha de crear la nota amb dades vàlides', async () => {
        const res = await request(app)
            .post('/notes')
            .send({
                title: 'Nota Vàlida',
                content: 'Contingut vàlid',
                category: 'Treball',
                priority: 'high'
            });

        expect(res.status).toBe(302);
        const notes = Note.getAll();
        expect(notes).toHaveLength(1);
        expect(notes[0].title).toBe('Nota Vàlida');
        expect(notes[0].category).toBe('Treball');
        expect(notes[0].priority).toBe('high');
    });
});

// =============================================
// TEST TODO 3: La llista de notes mostra una taula
// =============================================

describe('TODO 3: Notes list displays a table', () => {
    test('ha de mostrar les notes en una taula HTML', async () => {
        Note.create({ title: 'Primera Nota', content: 'Contingut 1' });
        Note.create({ title: 'Segona Nota', content: 'Contingut 2' });

        const res = await request(app).get('/notes');

        expect(res.status).toBe(200);
        expect(res.text).toContain('Primera Nota');
        expect(res.text).toContain('Segona Nota');
        expect(res.text).toContain('<table');
    });

    test('ha de mostrar la categoria de cada nota', async () => {
        Note.create({ title: 'Nota Treball', content: 'Test', category: 'Treball' });

        const res = await request(app).get('/notes');

        expect(res.status).toBe(200);
        expect(res.text).toContain('Treball');
    });

    test('ha de mostrar l\'estat de cada nota', async () => {
        Note.create({ title: 'Nota Pendent', content: 'Test' });

        const res = await request(app).get('/notes');

        expect(res.status).toBe(200);
        expect(res.text).toContain('Pendent');
    });
});

// =============================================
// TEST TODO 4: Middleware de logging
// =============================================

describe('TODO 4: Logger middleware', () => {
    test('ha de registrar el mètode HTTP i la URL', async () => {
        const spy = jest.spyOn(console, 'log').mockImplementation();

        await request(app).get('/notes');

        expect(spy).toHaveBeenCalled();
        const logCall = spy.mock.calls.find(call =>
            call[0] && typeof call[0] === 'string' &&
            call[0].includes('GET') && call[0].includes('/notes')
        );
        expect(logCall).toBeDefined();

        spy.mockRestore();
    });

    test('ha de registrar el timestamp', async () => {
        const spy = jest.spyOn(console, 'log').mockImplementation();

        await request(app).get('/');

        expect(spy).toHaveBeenCalled();
        const logCall = spy.mock.calls.find(call =>
            call[0] && typeof call[0] === 'string' &&
            call[0].includes('[') && call[0].includes(']')
        );
        expect(logCall).toBeDefined();

        spy.mockRestore();
    });
});

// =============================================
// TEST TODO 5: Toggle complete (async)
// =============================================

describe('TODO 5: Toggle complete (async)', () => {
    test('ha de canviar l\'estat de completament de la nota', async () => {
        Note.create({ title: 'Toggle Test', content: 'Content' });

        expect(Note.getById(1).completed).toBe(false);

        const res = await request(app).post('/notes/1/toggle');

        expect(res.status).toBe(302);
        expect(Note.getById(1).completed).toBe(true);
    });

    test('ha de retornar 404 per una nota inexistent', async () => {
        const res = await request(app).post('/notes/999/toggle');

        expect(res.status).toBe(404);
    });

    test('ha de poder fer toggle dues vegades', async () => {
        Note.create({ title: 'Double Toggle', content: 'Content' });

        await request(app).post('/notes/1/toggle');
        expect(Note.getById(1).completed).toBe(true);

        await request(app).post('/notes/1/toggle');
        expect(Note.getById(1).completed).toBe(false);
    });
});

// =============================================
// Tests addicionals (ja implementats - control)
// =============================================

describe('Funcionalitats ja implementades', () => {
    test('GET / ha de retornar la pàgina d\'inici', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Notes Manager');
    });

    test('GET /notes/create ha de mostrar el formulari', async () => {
        const res = await request(app).get('/notes/create');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Crear Nova Nota');
    });

    test('GET /notes/:id ha de mostrar una nota', async () => {
        Note.create({ title: 'Show Test', content: 'Show Content' });

        const res = await request(app).get('/notes/1');
        expect(res.status).toBe(200);
        expect(res.text).toContain('Show Test');
    });

    test('POST /notes/:id/delete ha de eliminar la nota', async () => {
        Note.create({ title: 'Delete Test', content: 'Content' });
        expect(Note.getAll()).toHaveLength(1);

        const res = await request(app).post('/notes/1/delete');
        expect(res.status).toBe(302);
        expect(Note.getAll()).toHaveLength(0);
    });
});

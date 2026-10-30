/**
 * Model Note - Emmagatzematge en memòria
 */
class Note {
    static notes = [];
    static nextId = 1;

    static getAll() {
        return this.notes;
    }

    static getById(id) {
        return this.notes.find(note => note.id === parseInt(id));
    }

    static create(data) {
        const note = {
            id: this.nextId++,
            title: data.title,
            content: data.content,
            category: data.category || 'General',
            priority: data.priority || 'medium',
            completed: false,
            createdAt: new Date().toISOString(),
        };
        this.notes.push(note);
        return note;
    }

    static toggleComplete(id) {
        const note = this.getById(id);
        if (note) {
            note.completed = !note.completed;
            return note;
        }
        return null;
    }

    static delete(id) {
        const index = this.notes.findIndex(note => note.id === parseInt(id));
        if (index !== -1) {
            return this.notes.splice(index, 1)[0];
        }
        return null;
    }

    static reset() {
        this.notes = [];
        this.nextId = 1;
    }
}

module.exports = Note;

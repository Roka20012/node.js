const Note = require("../models/Note");

module.exports = {
    getNotes() {
        return Note.find({});
    },
    getNotesById(noteId) {
        return Note.findById(noteId);
    },
    deleteNote(noteId) {
        return Note.findByIdAndRemove(noteId);
    },
    addNote(body) {
        const newNote = new Note(note);
        return newNote.save();
    },
    updatedNote(noteId, updatedNote) {
        return Note.findByIdAndUpdate(noteId, updatedNote);
    }
};

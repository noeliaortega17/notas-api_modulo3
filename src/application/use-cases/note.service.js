// importante al trabajar con nuestros archivos debemos añadir al final .js requerido para ESM
import NoteEntity from "../../domain/entities/note.entity.js";

export default class NoteService {
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }

    async createNote(data) {
        if (!data.title || !data.content) { throw new Error("Title and content are required"); }

        const note = new NoteEntity(data);
        return await this.noteRepository.save(note);
    }

    async getNotesByUserId(userId){
        return await this.noteRepository.findByUserId(userId);
    }

    async updateNote(id, data) {
        if (!id) throw new Error("Id is required");

        const updatedNote = await this.noteRepository.update(id, data);

        if (!updatedNote) {
            throw new Error("Note not found");
        }

        return updatedNote;
    }

    async deleteNote(id) {
        if (!id) throw new Error("Id is required");

        const deleted = await this.noteRepository.delete(id);

        if (!deleted) {
            throw new Error("Note not found");
        }

        return { message: "Note deleted successfully" };
    }
}
import NoteModel from  "./note.model.js";

export default class NoteMongoRepository { 
    async save(noteEntity) {
        const note = new NoteModel({
            title: noteEntity.title,
            content: noteEntity.content,
            imageUrl: noteEntity.imageUrl,
            isPrivate: noteEntity.isPrivate,
            password: noteEntity.password,
            userId: noteEntity.userId
        });
        const savedNote = await note.save();
        return savedNote.toObject();
    }

    async findByUserId(userId) {
       return await NoteModel.find({ userId });
    }

    async update(id, data) {
        const updatedNote = await NoteModel.findByIdAndUpdate(
            id,
            data,   
            { new: true }
        );

        return updatedNote ? updatedNote.toObject() : null;
    }

    async delete(id) {
        const result = await NoteModel.findByIdAndDelete(id);
        return result ? true : false;
    }
}
export default class NoteController {
    constructor(noteService) {
        this.noteService = noteService;
    }

    createNote = async (req, res) => {
        try {
            const data = req.body;
            if (req.file) data.imageUrl = '/uploads/' + req.file.filename;
            data.userId = req.user.id;

            const note = await this.noteService.createNote(data);

            res.status(201).json({
                success: true,
                data: note
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: {
                    title: "Bad Request",
                    description: error.message
                }
            });
        }
    };

    getNotesByUserId = async (req, res) => {
        try {
            const notes = await this.noteService.getNotesByUserId(req.user.id);

            res.status(200).json({
                success: true,
                data: notes
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: {
                    title: "Internal Server Error",
                    description: error.message
                }
            });
        }
    };

    updateNote = async (req, res) => {
        try {
            const { id } = req.params;
            const data = req.body;

            if (req.file) data.imageUrl = '/uploads/' + req.file.filename;

            const updatedNote = await this.noteService.updateNote(id, data);

            res.status(200).json({
                success: true,
                data: updatedNote
            });

        } catch (error) {
            if (error.message === "Note not found") {
                return res.status(404).json({
                    success: false,
                    error: {
                        title: "Not Found",
                        description: error.message
                    }
                });
            }

            res.status(400).json({
                success: false,
                error: {
                    title: "Bad Request",
                    description: error.message
                }
            });
        }
    };

    deleteNote = async (req, res) => {
        try {
            await this.noteService.deleteNote(req.params.id);

            res.status(204).send();

        } catch (error) {
            res.status(404).json({
                success: false,
                error: {
                    title: "Not Found",
                    description: error.message
                }
            });
        }
    };

    shareNote = async (req, res) => {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: {
                    title: "Bad Request",
                    description: "Target email is required"
                }
            });
        }

        try {
            const result = await this.noteService.shareNoteByEmail(
                req.params.id,
                email,
                req.user.id
            );

            res.status(200).json({
                success: true,
                data: result
            });

        } catch (error) {
            if (error.message.includes("not found")) {
                return res.status(404).json({
                    success: false,
                    error: {
                        title: "Not Found",
                        description: error.message
                    }
                });
            }

            if (error.message.includes("Unauthorized")) {
                return res.status(403).json({
                    success: false,
                    error: {
                        title: "Forbidden",
                        description: error.message
                    }
                });
            }

            res.status(400).json({
                success: false,
                error: {
                    title: "Bad Request",
                    description: error.message
                }
            });
        }
    };
}
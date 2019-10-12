const router = require("express").Router();

const checkToken = require("../middleware/checkToken");
const Note = require("../../database/dao/Note");

router.delete("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.decoded._id;
        const note = await Note.getNotesById(id);
        if (!note) {
            res.status(400).json({
                status: "error",
                message: "Don't have this note"
            });
        }
        if (note.userId != userId) {
            res.status(401).json({
                status: "error",
                message: "Unathorized"
            });
        }
        await Note.deleteNote(id);

        return res.status(200).json({
            status: "Succes",
            message: "Note was successfully deleted"
        });
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            data: "error 500"
        });
    }
});

router.get("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.decoded._id;
        const note = await Note.getNoteById(id);
        if (note.id !== userId) {
            res.status(401).json({
                status: "error",
                message: "Unathorized"
            });
        }

        res.status(200).json(note);
    } catch (err) {
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

router.get("/", checkToken, async (req, res) => {
    try {
        const id = req.decoded._id; //userId
        let notes = await Note.getNotes();

        notes = notes.filter(note => note.userId + "" === id);

        res.status(200).json(notes);
    } catch (err) {
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

router.put("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.decoded._id;
        const note = await Note.getNotesById(id);
        if (!note) {
            res.status(400).json({
                status: "error",
                message: "Don't have this note"
            });
        }
        if (note.userId != userId) {
            res.status(401).json({
                status: "error",
                message: "Unathorized"
            });
        }

        await Note.updatedNote(id, req.body);

        res.status(200).json({
            status: "Succes",
            message: "Note was succefully updated"
        });
    } catch (err) {
        console.log("err is", err);
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

router.post("/", checkToken, async (req, res) => {
    try {
        const { _id: id } = req.decoded;
        if ("userId" in req.body) {
            const { userId } = req.body;
            if (userId !== id) {
                res.status(401).json({
                    status: "error",
                    message: "unathorized"
                });
            }
            const note = await Note.addNote(req.body);
            res.status(201).json(note);
        } else {
            const note = await Note.addNote({ ...req.body, userId: id });
            res.status(201).json(note);
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
});

module.exports = router;

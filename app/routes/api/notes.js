const router = require("express").Router();

const checkToken = require("../middleware/checkToken");
const Note = require("../../database/dao/Note");

router.delete("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.decoded);
        await Note.deleteNote(id);

        console.log("Note got deleted");

        return res.status(200).json({
            status: "Succes",
            message: "Note was successfully deleted"
        });
    } catch (err) {
        console.log("err is", err);
        return res.status(500).json({
            status: "Error",
            data: "error 500"
        });
    }
});

router.get("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.decoded);
        const note = await Note.getNotesById(id);

        console.log("get note");
        console.log("note is", note);

        res.status(200).json({
            status: "Succes",
            data: note
        });
    } catch (err) {
        console.log("err is", err);
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

router.get("/", checkToken, async (req, res) => {
    try {
        console.log(req.decoded);
        const notes = await Note.getNotes();

        console.log("got deleted");
        console.log("notes is", notes);

        res.status(200).json({
            status: "Succes",
            data: notes
        });
    } catch (err) {
        console.log("err is", err);
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

router.put("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.decoded);

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
            res.status(201).json({
                status: "Success",
                data: note
            });
        } else {
            const note = await Note.addNote({ ...req.body, userId: id });
            res.status(201).json({
                status: "Success",
                data: note
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
});

module.exports = router;

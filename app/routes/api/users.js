const router = require("express").Router();

const checkToken = require("../middleware/checkToken");
const User = require("../../database/dao/User");
const Note = require("../../database/dao/Note");

router.delete("/user", checkToken, async (req, res) => {
    try {
        const userId = req.decoded._id;
        await User.deleteUser(userId);

        return res.status(200).json({
            status: "Succes",
            message: "User successfully deleted"
        });
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

router.get("/user", checkToken, async (req, res) => {
    try {
        const userId = req.decoded._id;
        const user = await User.getUserById(userId, "_id username");

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({
            status: "Error",
            data: "error 500"
        });
    }
});

router.get("/", checkToken, async (req, res) => {
    try {
        const users = await User.getUsers("_id username");
        const notes = await Note.getNotes();
        const notesStr = notes.toString();
        const newUsers = users.map(({ username, _id }) => {
            const notes = notesStr.match(new RegExp(_id, "g")) || [];
            return {
                username,
                _id,
                notes: notes.length
            };
        });

        res.status(200).json(newUsers);
    } catch (err) {
        res.status(500).json({
            status: "Error",
            data: "error 500"
        });
    }
});

router.put("/user", checkToken, async (req, res) => {
    try {
        const userId = req.decoded._id;

        await User.updateUser(userId, req.body);

        res.status(200).json({
            status: "Succes",
            message: "User was succefully updated"
        });
    } catch (err) {
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});

module.exports = router;

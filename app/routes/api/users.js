const router = require("express").Router();

const checkToken = require("../middleware/checkToken");
const User = require("../../database/dao/User");

router.delete("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.decoded);
        await User.deleteUser(id);

        console.log("got deleted");

        return res.status(200).json({
            status: "Succes",
            message: "User successfully deleted"
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
        const user = await User.getUserById(id, "_id username");

        console.log("get user");
        console.log("user is", user);

        res.status(200).json({
            status: "Succes",
            data: user
        });
    } catch (err) {
        console.log("err is", err);
        res.status(500).json({
            status: "Error",
            data: "error 500"
        });
    }
});

router.get("/", checkToken, async (req, res) => {
    try {
        console.log(req.decoded);
        const users = await User.getUsers("_id username");

        console.log("got deleted");
        console.log("users is", users);

        res.status(200).json({
            status: "Succes",
            data: users
        });
    } catch (err) {
        console.log("err is", err);
        res.status(500).json({
            status: "Error",
            data: "error 500"
        });
    }
});

router.put("/:id", checkToken, async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.decoded);

        await User.updateUser(id, req.body);

        res.status(200).json({
            status: "Succes",
            message: "User was succefully updated"
        });
    } catch (err) {
        console.log("err is", err);
        res.status(500).json({
            status: "Error",
            data: err.message
        });
    }
});



module.exports = router;

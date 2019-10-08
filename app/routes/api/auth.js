const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../database/dao/User");

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.getUserByUsename(username);
        if (user) {
            const isRight = await bcrypt.compare(password, user.password);
            if (isRight) {
                const token = jwt.sign(
                    JSON.stringify({
                        _id: user._id,
                        username,
                        user
                    }),
                    config.get("JWT.secret")
                );
                res.status(200).json(token);
            } else {
                res.status(400).json({
                    status: "error",
                    message: "Incorrect password"
                });
            }
        } else {
            res.status(400).json({
                status: "error",
                message: "User not found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

router.post("/register", async (req, res) => {
    try {
        const { username, password, confirmation } = req.body;
        const users = await User.getUsers();
        const user = users.find(user => user.username === username);
        if (!user) {
            if (password === confirmation) {
                const salt = await bcrypt.genSalt(10);
                const encrypted = await bcrypt.hash(password, salt);
                const newUser = await User.addUser({
                    username,
                    password: encrypted
                });
                res.status(201).json(newUser);
            } else {
                res.status(400).json({
                    status: "error",
                    message: "Passwords don't match"
                });
            }
        } else {
            res.status(400).json({
                status: "error",
                message: "User already exist"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        });
    }
});

module.exports = router;


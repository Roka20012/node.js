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
                res.status(200).json({
                    status: "Success",
                    token
                });
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
                res.status(201).json({
                    status: "Success",
                    data: newUser
                });
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

router.delete("/user", async (req, res) => {
    try {
        const user = await User.getUserByUsename("roka20012");
        // const id = user._id;
        const id = "5d935ee838a525459c21207a";
        res.status(204).json({
            status: "Success",
            message: "Delete susfully"
        });
        // await User.deleteUser({ _id: id });
        // res.status(204).json({
        //     status: "Success",
        //     message: "Delete susfully"
        // });
    } catch (err) {
        return res.status(500).json({
            status: "Error",
            message: err.message
        });
    }
});

module.exports = router;

//token
/*eyJhbGciOiJIUzI1NiJ9.
eyJfaWQiOiI1ZDkzMmE2NWI1N2M1MjM0MTBi
NGMyNDMiLCJ1c2VybmFtZSI6InJva2EyMDAxMiJ9._
L5kawqhUaSegigm_HPXKXW1RKW52j0EbOlgqx2JSzk
*/

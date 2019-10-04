const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoConnection = require("./app/database/connection/mongoose");

const log = require("./app/routes/middleware/log");
// const checkToken = require("./app/routes/middleware/checkToken");

const authRouter = require("./app/routes/api/auth");
const usersRouter = require("./app/routes/api/users");
const notesRouter = require("./app/routes/api/notes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
// app.use(checkToken);

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoConnection.then(() => console.log("mongo connected"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

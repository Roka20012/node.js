const express = require("express");
const app = express();
const mongoConnection = require("./app/database/connection/mongoose");

const log = require("./app/routes/middleware/log");
// const checkToken = require("./app/routes/middleware/checkToken");

const authRouter = require("./app/routes/api/auth");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(log);
// app.use(checkToken);

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

mongoConnection.then(() => console.log("mongo connected"));

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

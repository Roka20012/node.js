const jwt = require("jsonwebtoken");
const config = require("config");

function checkToken(req, res, next) {
    let token = req.headers["authorization"];

    if (token) {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length);
            console.log("token is ", token);
        }

        jwt.verify(token, config.get("JWT.secret"), (err, decoded) => {
            if (err) {
                return res.json({
                    status: "error",
                    message: "Token is not valid"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            status: "error",
            message: "Auth token is not supplied"
        });
    }
}

module.exports = checkToken;

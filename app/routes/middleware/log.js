const colors = require("colors");

module.exports = (req, res, next) => {
    const requestLog = `${req.originalUrl} ` + `${res.statusCode}`.white;

    switch (req.method) {
        case "GET":
            console.log(`${req.method} `.green + requestLog);
            break;
        case "POST":
            console.log(`${req.method} `.blue + requestLog);
            break;
        case "PUT":
            console.log(`${req.method} `.yellow + requestLog);
            break;
        case "DELETE":
            console.log(`${req.method} `.red + requestLog);
            break;
        default:
            break;
    }

    next();
};

const express = require("express");
const mainRouter = require("./src/app.routes");
require("dotenv").config();
const AllExceptionHandler = require("./src/common/exception/all-exception.handler")
const NotFoundHandler = require("./src/common/exception/not-found.handler")


async function main() {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    require("./src/config/mongo.config")
    app.use(mainRouter);
    NotFoundHandler(app);
    AllExceptionHandler(app);
    app.listen(3000, () => {
        console.log("server run on port 3000");
    })
}
main();
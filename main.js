const express = require("express");
const mainRouter = require("./src/app.routes");
require("dotenv").config();
const AllExceptionHandler = require("./src/common/exception/all-exception.handler")
const NotFoundHandler = require("./src/common/exception/not-found.handler");
const SwaggerConfig = require("./src/config/swagger.config");
const cookieParser = require("cookie-parser");


async function main() {
    const app = express();
    const port = process.env.PORT
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    require("./src/config/mongoos.config")
    SwaggerConfig(app);
    app.use(cookieParser())
    app.use(mainRouter);
    NotFoundHandler(app);
    AllExceptionHandler(app);
    app.listen(port, () => {
        console.log(`server :http://127.0.0.1:${port}`)
    })
}
main();
const express = require("express");
const mainRouter = require("./src/app.routes");
require("dotenv").config();



async function main(){
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(express.static("public"));
    app.use(mainRouter);
}
main();
const { Router } = require("express");

const mainRouter = Router();
mainRouter.get("/");

module.exports = mainRouter;
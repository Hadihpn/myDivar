const {Router} = require("express");
const categoryController = require("./category.controller");
const router = Router();
router.post("/create",categoryController.create)
router.get("/",categoryController.find)
module.exports = {
    CategoryRouter:router
}


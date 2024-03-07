const {Router} = require("express");
const postController = require("./post.controller");

const router = Router();

router.use("/",postController.create)

module.exports = {
    PostRouter:router
}
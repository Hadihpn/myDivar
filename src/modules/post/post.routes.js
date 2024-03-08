const {Router} = require("express");
const postController = require("./post.controller");
const Authorization = require("../../common/guard/authorization.guard");
const { upload } = require("../../common/utils/multer");

const router = Router();

router.get("/create", Authorization,postController.createPostPage)
router.post("/create", Authorization, upload.array('images', 10), postController.create)
router.get("/my", Authorization, postController.findMyPost)
router.delete("/delete/:id", Authorization, postController.remove)
router.get("/:id", postController.showPost)

module.exports = {
    PostRouter:router
}
const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");
const { UserRouter } = require("./modules/user/user.routes");
const Authorization = require("./common/guard/authorization.guard");
const { CategoryRouter } = require("./modules/category/category.routes");
const { PostRouter } = require("./modules/post/post.routes");
const { OptionRouter } = require("./modules/option/option.routes");
const postController = require("./modules/post/post.controller");

const mainRouter = Router();
mainRouter.use("/auth",AuthRouter)
mainRouter.use("/user",Authorization,UserRouter)
mainRouter.use("/category",CategoryRouter)
mainRouter.use("/post",PostRouter)
mainRouter.use("/option",OptionRouter)
mainRouter.get("/",postController.postList)

mainRouter.get("/panel",(req,res) =>{
    res.render("./pages/panel/dashboard.ejs")
})


module.exports = mainRouter;
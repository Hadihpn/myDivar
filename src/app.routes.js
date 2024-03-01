const { Router } = require("express");
const { AuthRouter } = require("./modules/auth/auth.routes");

const mainRouter = Router();
mainRouter.use("/auth",AuthRouter)
mainRouter.get("/s",(req,res,next)=>{
    console.log("asdfds")
})


module.exports = mainRouter;
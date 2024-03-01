const {Router} = require("express");
const authController = require("./auth.controller");
const router = Router();
router.get("/send-otp",(req,res,next)=>{
    console.log("asdfds")
})
module.exports = {
    AuthRouter:router
}
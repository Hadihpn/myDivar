const createHttpError = require("http-errors");
const AuthorizationMessage = require("../messages/authentication.messages");
const jwt = require("jsonwebtoken");
const UserModel = require("../../modules/user/user.model");
require("dotenv").config();
const Authorization =async (req,res,next) =>{
    try {
        const token = req?.cookie?.accessToken;
        if (!token) throw new createHttpError.BadRequest(AuthorizationMessage.UnAuthorize);
       const data = jwt.verify(token,process.env.JWT_SECRET_KEY) 
       if(data.id){
        const user = await UserModel.findById(data.id,{accessToken:0,otp:0}).lean()
        if(!user) throw new createHttpError.BadRequest(AuthorizationMessage.NotFoundAccount)
        req.user = user;
    return next()
       }
       
    } catch (error) {
        next(error)
    }
}
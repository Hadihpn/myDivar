const  autoBind  = require("auto-bind");
const userService = require("./user.service");
const { json } = require("express");

class userController {
    #service;
    constructor() {
       autoBind(this)
        this.#service = userService;
    }
    async whoami(req,res,next){
        try {
            const userName= req.user;
            return res.json(userName);
        } catch (error) {
        next(error)            
        }
    }
}
module.exports = new userController();
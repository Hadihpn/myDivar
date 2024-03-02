const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.messages");

class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }

    async sendOTP(req, res, next) {
        try {
            const {mobile} = req.body;
            if(mobile){
                await this.#service.sendOTP(mobile);
                return res.json(AuthMessage.sendOTPSuccess)
            }
           
        } catch (error) {
            next(error)
        }
    }
    async checkOTP(req,res,next){
        try {
            const{mobile,code} = req.body;
            

            await this.#service.checkOTP(mobile,code)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController();
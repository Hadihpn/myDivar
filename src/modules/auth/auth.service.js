const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");
const { randomInt } = require("crypto");
const { log } = require("console");
const createHttpError = require("http-errors");
const { use } = require("../../app.routes");
const { AuthMessage } = require("./auth.messages");
const  jwt  = require("jsonwebtoken");


class AuthService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = UserModel;
    }
    async sendOTP(mobile) {
        if (mobile) {
            const user = await this.#model.findOne({ mobile });
            const now = new Date().getTime();
            const otp = {
                code: randomInt(10000, 99999),
                expiresIn: now + (1000 * 60 * 2)
            };
            if (!user) {
                const newUser = await this.#model.create({ mobile, otp });
                return newUser
            }
            if (user.otp && now < user.otp.expiresIn) {
                throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired)
            };
            user.otp = otp;
            await user.save();
            return user;
        }
    }
    async checkOTP(mobile, code) {
        if (mobile && code) {
            const user = await this.#model.findOne({ mobile });
            const now = new Date().getTime();
            if (now > user.expiresIn) throw new createHttpError.BadRequest(AuthMessage.OtpCodeExpired);
            if (!user.otp.code == code) throw new createHttpError.BadRequest(AuthMessage.WrongOtpCode);
            const token = await this.signToken({mobile,id:user._id})
            console.log(user);
            console.log(mobile);
            console.log(user._id);
            console.log(process.env.JWT_SECRET_KEY);
            console.log(token);
            user.accessToken = token
            user.verifiedMobile = true;
            await user.save();


            return user;
        }
    }
    async signToken(payload){
        return jwt.sign(payload,process.env.JWT_SECRET_KEY,{ expiresIn: "1y" })
        
    }
}
module.exports = new AuthService()
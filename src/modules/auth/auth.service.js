const autoBind = require("auto-bind");
const UserModel = require("../user/user.model");

class AuthService {
    #model;
    constructor() {
        autoBind(this)
        this.#model = UserModel;

    }
    async findUserByMobile(mobile) {
        try {
            if (mobile) {
                const user = await this.#model.find({ mobile });
                if(!user) user = await this.#model.create()
                const now = new Date.now();
                const otp = {
                    code: randomInt(10000, 99999),
                    expiresIn: now + (1000 * 60 * 2)
                };
                user.otp = otp;


            }

        } catch (error) {
            next(error)
        }
    }
}
module.exports = new AuthService()
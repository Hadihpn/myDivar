const autoBind = require("auto-bind");
const authService = require("./auth.service");

class AuthController {
    #service;
    constructor() {
        autoBind(this);
        this.#service = authService;
    }

    async sendTP(req, res, next) {
        try {
            console.log("adfs");
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new AuthController();
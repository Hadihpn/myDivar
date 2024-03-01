const autoBind = require("auto-bind");
const UserModel = require("./user.model");
class userService{
    #model;
    constructor(){
        autoBind(this);
        this.#model = UserModel
    }
}
module.exports = new userService()
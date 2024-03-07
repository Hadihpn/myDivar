const autoBind = require("auto-bind");
const postService = require("./post.service");

class PostController{
    #service;
    constructor(){
        autoBind(this);
        this.#service = postService;
    }
    async create(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new PostController()
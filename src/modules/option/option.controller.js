const autoBind = require("auto-bind");
const optionService = require("./option.service");

class OptionController{
    #service
    constructor(){
        autoBind(this);
        this.#service = optionService;
    }
    async create(req,res,next){
        try {
            console.log(req.body)
            const {title,key,category,type,enum:list,guide,reuired} = req.body;
            await this.#service.create({title,key,category,type,enum:list,guide,reuired})
        } catch (error) {
            next(error)
        }
    }
    async findById(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async findByCategoryId(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async update(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
    async find(req,res,next){
        try {
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = new OptionController()
const autoBind = require("auto-bind");
const optionService = require("./option.service");

class OptionController {
    #service
    constructor() {
        autoBind(this);
        this.#service = optionService;
    }
    async create(req, res, next) {
        try {
            console.log(req.body)
            const { title, key, category, type, enum: list, guide, reuired } = req.body;
            await this.#service.create({ title, key, category, type, enum: list, guide, reuired })
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {
            const { title, key, guide, enum: list, type, category, required } = req.body;
            const { id } = req.params;
            await this.#service.update({ id, title, key, guide, enum: list, type, category, required })
            return res.json({
                message: OptionMessage.Updated
            })
        } catch (error) {
            next(error)
        }
    }
    async removeById(req, res, next) {
        try {
            const { id } = req.params;
            const options = await this.#service.removeById(id);
            return res.json({
                message: OptionMessage.Deleted
            })
        } catch (error) {
            next(error);
        }
    }
    async find(req, res, next) {
        try {
            const options = await this.#service.find()
            res.json(options)
        } catch (error) {
            next(error)
        }
    }
    async findById(req, res, next) {
        try {
            const { id } = req.params;
            const option = await this.#service.findByCategoryId(id);
            return res.json(option)
        } catch (error) {
            next(error)
        }
    }
    async findByCategoryId(req, res, next) {
        try {
            const { categoryId } = req.params;
            const option = await this.#service.findByCategoryId(categoryId)
            return res.json(option)
        } catch (error) {
            next(error)
        }
    }
    async findByCategorySlug(req, res, next) {
        try {
            const { slug } = req.params;
            const option = await this.#service.findByCategorySlug(slug)
            return res.json(option)
        } catch (error) {
            next(error)
        }
    }
    async update(req, res, next) {
        try {

        } catch (error) {
            next(error)
        }
    }

}
module.exports = new OptionController()
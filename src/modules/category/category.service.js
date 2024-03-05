const autoBind = require("auto-bind");
const CategoryModel = require("./category.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const { CategoryMessage } = require("./category.messages");
const slugify = require("slugify");
class CategoryService {
    #model;
    constructor() {
        autoBind(this);
        this.#model = CategoryModel;
    }
    async create(categoryDto) {
        if (categoryDto?.parent && isValidObjectId(categoryDto.parent)) {
            const existedCategory = await this.checkExistById(categoryDto.parent);
            categoryDto.parent = existedCategory._id
            categoryDto.parents = [
                ... new Set(
                    ([existedCategory._id.toString()].concat(
                        existedCategory.parents.map(id => id.toString())
                    )
                    ).map(id => new Types.ObjectId(id)))
            ]
        }
        if (categoryDto.slug) {
            categoryDto.slug = slugify(categoryDto.slug.toString())
            await this.alreadyExistBySlug(categoryDto.slug)
        } else {
            categoryDto.slug = slugify(categoryDto.name)
        }
        await this.#model.create(categoryDto)
    }
    async find() {
        return await this.#model.find({parent: {$exists: false}})
    }

    async checkExistById(id) {
        const category = await this.#model.findById(id);
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
        return category;
    }
    async checkExistBySlug(slug) {
        const category = await this.#model.findOne({ slug });
        if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound)
        return category;
    }
    async alreadyExistBySlug(slug) {
        const category = await this.#model.findOne({ slug });
        if (category) throw new createHttpError.Conflict(CategoryMessage.AlreadyExist)
        return null;
    }
}

module.exports = new CategoryService();
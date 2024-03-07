const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const CategoryModel = require("../category/category.model");
const categoryService = require("../category/category.service");
const { default: slugify } = require("slugify");

class OptionService {
    #model
    #category
    constructor() {
        autoBind(this);
        this.#model = OptionModel;
        this.#category = categoryService;
    }

    async create(optionDto){
        const category = await categoryService.checkExistById(optionDto?.category);
        optionDto.category = category._id;
        optionDto.key = slugify(OptionDto.key, { trim: true, replacement: "_", lower: true });
        await this.alreadyExistByCategoryAndKey(OptionDto.key, category._id)
        if (OptionDto?.enum && typeof OptionDto.enum === "string") {
            OptionDto.enum = OptionDto.enum.split(",");
        } else if (!Array.isArray(OptionDto.enum)) OptionDto.enum = [];
        if (isTrue(OptionDto?.required)) OptionDto.required = true;
        const option = await this.#model.create(OptionDto)

        return option;
    }
    async alreadyExistByCategoryAndKey(key, category) {
        const isExist = await this.#model.findOne({ category, key });
        if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist)
        return null;
    }
}
module.exports = new OptionService()
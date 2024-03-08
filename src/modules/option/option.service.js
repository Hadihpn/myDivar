const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const CategoryModel = require("../category/category.model");
const categoryService = require("../category/category.service");
const { default: slugify } = require("slugify");
const createHttpError = require("http-errors");
const { OptionMessage } = require("../../../../divar/src/modules/option/option.message");
const { isTrue } = require("../../common/utils/function");

class OptionService {
    #model
    #category
    constructor() {
        autoBind(this);
        this.#model = OptionModel;
        this.#category = categoryService;
    }

    async create(optionDto) {
        const category = await categoryService.checkExistById(optionDto?.category);
        optionDto.category = category._id;
        optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });
        await this.alreadyExistByCategoryAndKey(optionDto.key, category._id)
        if (optionDto?.enum && typeof optionDto.enum === "string") {
            optionDto.enum = optionDto.enum.split(",");
        } else if (!Array.isArray(optionDto.enum)) optionDto.enum = [];
        if (isTrue(optionDto?.required)) optionDto.required = true;
        const option = await this.#model.create(optionDto)
        return option;
    }
    async update(id, OptionDto) {
        try {
            const existOption = await this.checkExistById(id);
            if (OptionDto.category && isValidObjectId(OptionDto.category)) {
                const category = await this.#category.checkExistById(OptionDto.category);
                OptionDto.category = category._id;
            }else{
                delete OptionDto.category
            }
            if (OptionDto.slug) {
                OptionDto.key = slugify(OptionDto.key, { trim: true, replacement: "_", lower: true });
                let categoryId = existOption.category;
                if(OptionDto.category) categoryId = OptionDto.category;
                await this.alreadyExistByCategoryAndKey(OptionDto.key, categoryId)
            }
            if (OptionDto?.enum && typeof OptionDto.enum === "string") {
                OptionDto.enum = OptionDto.enum.split(",");
            } else if (!Array.isArray(OptionDto.enum)) delete OptionDto.enum ;
            if (isTrue(OptionDto?.required)) OptionDto.required = true
            else if (isFalse(OptionDto?.required)) OptionDto.required = false
            else delete OptionDto.required;

            const option = await this.#model.updateOne({_id:id},{$set:OptionDto})

            return option;
        } catch (error) {

        }
    }
    async find() {
        return this.#model.find({}, {}, { sort: { id: -1 } }).populate({ path: "category", select: { name: 1, slug: 1 } }).select({ __V: 0 });
    }
    async findById(id) {
        await this.checkExistById(id);
    }
    async findByCategoryId(category) {
        const options = await this.#model.find({category}).populate({ path: "category", select: { name: 1, slug: 1 } }).select({ __V: 0 });
        if (!options) throw new createHttpError.BadRequest(OptionMessage.NotFound)
        return options;
    }
    async findByCategorySlug(slug) {
        const options = await this.#model.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category"
                }
            },
            {
                $unwind: "$category"
            },

            {
                $addFields: {
                    categorySlug: "$category.slug",
                    categoryIcon: "$category.name",
                    categoryIcon: "$category.icon",
                }
            },
            {
                $project: {
                    category: 0,
                    __v: 0
                }
            },
            {
                $match: {
                    categorySlug: slug
                }
            }
        ]);
        return options;
    }
    async removeById(id) {
        await this.checkExistById(id);
        return await this.#model.deleteOne({ _id: id })
    }
    async checkExistById(id) {
        const option = await this.#model.findById(id);
        if (!option) throw new createHttpError.BadRequest(OptionMessage.NotFound)
        return option;
    }

    async alreadyExistByCategoryAndKey(key, category) {
        const isExist = await this.#model.findOne({ category, key });
        if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist)
        return null;
    }
}
module.exports = new OptionService()
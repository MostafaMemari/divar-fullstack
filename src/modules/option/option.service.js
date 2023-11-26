const autoBind = require("auto-bind");
const { OptionModel } = require("./option.model");
const createHttpError = require("http-errors");
const { OptionMessage } = require("./option.message");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionService {
  #model;
  #categoryService;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryService = categoryService;
  }

  async find() {
    const orders = await this.#model.find({}, {}, { sort: { _id: -1 } }).populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return orders;
  }
  async findById(id) {
    return await this.checkExistById(id);
  }
  async removeById(id) {
    await this.checkExistById(id);
    return await this.#model.deleteOne({ _id: id });
  }
  async findByCategoryId(category) {
    return await this.#model.find({ category }).populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }
  async findByCategorySlug(slug) {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
        },
      },
      {
        $project: {
          // "category.icon": 0,
          // "category.name": 0,
          // "category.parent": 0,
          // "category.parents": 0,
          // "category.slug": 0,
          // "category._id": 0,
          category: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);
    return options;
  }
  async create(optionDto) {
    const category = await this.#categoryService.checkExistById(optionDto.category);
    optionDto.category = category._id;
    optionDto.key = slugify(optionDto.key, { trim: true, replacement: "_", lower: true });
    await this.alreadyExistByCategoryAndKey(optionDto.key, category._id);
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
    } else if (Array.isArray(optionDto.enum)) optionDto.enum = [];

    if (isTrue(optionDto?.required)) optionDto.required = true;
    if (isFalse(optionDto?.required)) optionDto.required = false;

    const option = await this.#model.create(optionDto);
    return option;
  }
  async checkExistById(id) {
    const option = await this.#model.findById(id);
    if (!option) throw createHttpError.NotFound(OptionMessage.NotFound);
    return option;
  }
  async alreadyExistByCategoryAndKey(key, category) {
    const isExist = await this.#model.findOne({ category, key });
    if (isExist) throw createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }
}

module.exports = new OptionService();

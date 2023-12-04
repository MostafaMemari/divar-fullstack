const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { isValidObjectId, Types } = require("mongoose");
const { OptionModel } = require("../option/option.model");
const { PostModel } = require("./post.model");

class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }
  async getCategoryOptions(categoryId) {
    const options = await this.#optionModel.find({ category: categoryId });
    return options;
  }
  async create(dto) {
    return await this.#model.create(dto);
  }
  async find(query = {}) {
    return await this.#model.find(query);
  }
}

module.exports = new PostService();

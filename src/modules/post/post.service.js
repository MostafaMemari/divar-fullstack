const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { isValidObjectId, Types } = require("mongoose");
const { OptionModel } = require("../option/option.model");
const { PostModel } = require("./post.model");
const { PostMessage } = require("./post.message");

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
  async find(userId) {
    if (userId && isValidObjectId(userId)) return await this.#model.find({ userId });
    throw createHttpError.BadRequest(PostMessage.RquestNotValid);
  }
}

module.exports = new PostService();

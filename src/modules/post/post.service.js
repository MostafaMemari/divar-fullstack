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
  async create(postDto) {}
}

module.exports = new PostService();

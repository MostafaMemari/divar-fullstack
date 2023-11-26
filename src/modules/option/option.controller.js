const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");
const { OptionMessage } = require("./option.message");
const optionService = require("./option.service");
class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = optionService;
  }
  async create(req, res, next) {
    try {
      const { title, key, type, enum: list, guid, category, required } = req.body;
      await this.#service.create({ title, key, type, enum: list, guid, category, required });
      return res.status(StatusCodes.CREATED).json({
        message: OptionMessage.created,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const option = await this.#service.findById(id);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
  async removeById(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.removeById(id);
      return res.json({
        message: OptionMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByCategorySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const options = await this.#service.findByCategorySlug(slug);
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const options = await this.#service.findByCategoryId(categoryId);
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();

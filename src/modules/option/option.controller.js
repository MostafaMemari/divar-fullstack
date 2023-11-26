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
      const { title, key, type, enum: list, guid, category } = req.body;
      await this.#service.create({ title, key, type, enum: list, guid, category });
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
    } catch (error) {
      next(error);
    }
  }
  async findByCategoryId(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OptionController();

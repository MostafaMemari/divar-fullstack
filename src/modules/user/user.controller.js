const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");
const userService = require("./user.service");
class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }
  async whoami(req, res, next) {
    try {
      const user = req.user;
      return res.json({ user });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();

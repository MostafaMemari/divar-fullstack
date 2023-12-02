const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");
const postService = require("./post.service");
const { PostMessage } = require("./post.message");
class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async createPostPage(req, res, next) {
    try {
      res.render("./pages/panel/create-post.ejs");
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();

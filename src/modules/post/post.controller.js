const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");
const postService = require("./post.service");
const { PostMessage } = require("./post.message");
const { CategoryModel } = require("../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { default: axios } = require("axios");
class PostController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }
  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let match = { parent: null };
      let options, category;
      if (slug) {
        slug = slug.trim();
        category = await CategoryModel.findOne({ slug });
        if (!category) throw createHttpError.NotFound(PostMessage.NotFound);
        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        showBack = true;
        match = {
          parent: category._id,
        };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);
      res.render("./pages/panel/create-post.ejs", { categories, showBack, options, category: category?._id.toString() });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const { title_post: title, description: content, lat, lng, category } = req.body;
      const result = await axios
        .get(`${process.env.MAP_IR_URL}?lat=${lat}&lon=${lng}`, {
          headers: {
            "x-api-key": process.env.MAP_API_KEY,
          },
        })
        .then((res) => res.data);
      delete req.body["title_post"];
      delete req.body["description"];
      delete req.body["lat"];
      delete req.body["lng"];
      delete req.body["category"];
      delete req.body["images"];
      const options = req.body;
      await this.#service.create({
        title,
        content,
        coordinate: [lat, lng],
        images: [],
        category: new Types.ObjectId(category),
        options,
        address: result.address,
        province: result.province,
        city: result.city,
        district: result.district,
      });
      return res.status(StatusCodes.CREATED).json({
        message: PostMessage.Created,
      });
    } catch (error) {
      console.log(error);
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

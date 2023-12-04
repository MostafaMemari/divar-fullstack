const autoBind = require("auto-bind");
const { StatusCodes } = require("http-status-codes");
const postService = require("./post.service");
const { PostMessage } = require("./post.message");
const { CategoryModel } = require("../category/category.model");
const createHttpError = require("http-errors");
const { Types } = require("mongoose");
const { getAddressDetail } = require("../../common/utils/http");
const { removeProperty } = require("../../common/utils/functions");
const utf8 = require("utf8");
class PostController {
  #service;
  success_message;
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
      const userId = req.user._id;
      const images = req?.files?.map((image) => image?.path?.slice(7));
      const { title_post: title, description: content, lat, lng, category } = req.body;
      const { address, province, city, district } = await getAddressDetail(lat, lng);

      const options = removeProperty(req.body, ["title_post", "description", "lat", "lng", "category", "images"]);
      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }
      await this.#service.create({
        userId,
        title,
        content,
        coordinate: [lat, lng],
        images,
        category: new Types.ObjectId(category),
        options,
        address,
        province,
        city,
        district,
      });
      const posts = await this.#service.find(userId);

      this.success_message = PostMessage.Created;
      return res.redirect("/post/my");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);
      this.success_message = PostMessage.Deleted;
      return res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }
  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;

      const posts = await this.#service.find(userId);
      res.render("./pages/panel/posts.ejs", { posts, success_message: this.success_message, error_message: null });
      this.success_message = null;
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();

const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();

router.post("/", optionController.create);
router.get("/by-category/:categoryId", optionController.findByCategoryId);
router.get("/by-category-slug/:slug", optionController.findByCategorySlug);

router.route("/:id").get(optionController.findById).delete(optionController.removeById);

router.get("/", optionController.find);

module.exports = {
  OptionRouter: router,
};

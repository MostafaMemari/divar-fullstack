const { Router } = require("express");
const { AuthRoutes } = require("./modules/auth/auth.routes");

const mainRouter = Router();

mainRouter.use("/auth", AuthRoutes);

module.exports = { mainRouter };

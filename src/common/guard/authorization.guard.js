const createHttpError = require("http-errors");
const { AuthorizationMessage } = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../modules/user/user.model");
require("dotenv").config();
const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookies?.access_token;
    if (!token) throw createHttpError.Unauthorized(AuthorizationMessage.Login);
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, { mobile: 1, createdAt: 1 }).lean();
      if (!user) throw createHttpError.Unauthorized(AuthorizationMessage.NotFoundAccount);
      req.user = user;
      return next();
    }
    throw createHttpError.Unauthorized(AuthorizationMessage.InvalidToken);
  } catch (error) {
    next(error);
  }
};

module.exports = { Authorization };

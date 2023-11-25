const createHttpError = require("http-errors");
const { AuthorizationMessage } = require("../messages/auth.message");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../modules/user/user.model");
require("dotenv").config();
const Authorization = async (req, res, next) => {
  try {
    const token = req?.cookie?.access_token;
    if (!token) throw createHttpError.Unauthorized(AuthorizationMessage.Login);
    const data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (typeof data === "object" && "id" in data) {
      const user = await UserModel.findById(data.id, { accessToken: 0, otp: 0 }).lean();
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

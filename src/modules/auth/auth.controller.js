const autoBind = require("auto-bind");
const authService = require("./auth.service");
const { AuthMessage } = require("./auth.messages");
const { NodeEnv } = require("../../common/constant/env.enum");
const { StatusCodes } = require("http-status-codes");
const { CookieNames } = require("../../common/constant/cookie.enum");
class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }
  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;
      const token = await this.#service.checkOTP(mobile, code);
      return res
        .cookie(CookieNames.AccessToken, token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production, // production => true
        })
        .status(StatusCodes.OK)
        .json({
          message: AuthMessage.loginSuccessfully,
        });
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      return res.clearCookie(CookieNames.AccessToken).status(StatusCodes.OK).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();

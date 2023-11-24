const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");
const createHttpError = require("http-errors");
const { AuthMessage } = require("./auth.messages");
const { randomInt } = require("crypto");
class AuthService {
  #model = UserModel;
  constructor() {
    autoBind(this);
  }
  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 1000 * 60 * 2,
    };
    const now = new Date().getTime();

    if (!user) {
      const newUser = await this.#model.create({ mobile, otp });
      return newUser;
    }

    if (user.otp && user.otp.expireIn > now) throw createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);

    user.otp = otp;
    await user.save();
    return user;
  }
  async checkOTP(mobile, code) {}

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }
}

module.exports = new AuthService();

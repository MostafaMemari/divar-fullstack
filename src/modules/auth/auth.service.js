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
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),
      expiresIn: now + 1000 * 60 * 2,
    };
    if (!user) {
      const newUser = await this.#model.create({ mobile, otp });
      return newUser;
    }

    if (user.otp && user.otp.expiresIn > now) throw createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);

    user.otp = otp;
    await user.save();
    return user;
  }
  async checkOTP(mobile, code) {
    const user = await this.checkExistByMobile(mobile);
    const now = new Date().getTime();
    if (user?.otp?.expiresIn < now) throw createHttpError.Unauthorized(AuthMessage.OtpCodeExpred);
    if (user?.otp?.code !== code) throw createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrect);
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
      await user.save();
    }
    return user;
  }

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }
}

module.exports = new AuthService();

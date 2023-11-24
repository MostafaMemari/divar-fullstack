const { Schema, model } = require("mongoose");

const OTPSchema = new Schema({
  code: { type: String, required: false, default: undefined },
  expiresIn: { type: Number, unique: true, required: true },
});

const UserSchema = new Schema(
  {
    fullName: { type: String, required: false },
    mobile: { type: String, unique: true, required: true },
    otp: { tpye: OTPSchema },
    verifiedMobile: { type: Boolean, default: false, required: true },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = model("user", UserSchema);
module.exports = { UserModel };

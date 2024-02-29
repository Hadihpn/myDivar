const { Schema, Model, Schema } = require("mongoose");

const OTPSchema = new Schema({
    code: {type: String, required: false, default: undefined},
    expiresIn: {type: Number, required: false, default: 0}
})
const UserSchema = new Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    phone: { type: String, required: true },
    otp: { type: OTPSchema },
    verifiedMobile: {type: Boolean, default: false, required: true},
    accessToken: {type: String},
}, {
    timestamps: true
})
const UserModel = model("user",UserSchema);
module.exports = UserModel;
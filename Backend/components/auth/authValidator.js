const Joi = require("joi");

const authSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const otpSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyOTPSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
});

const loginPasswordResetSchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.number().required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
});

const passwordResetSchema = Joi.object({
  _id: Joi.string().min(24).max(24).required(),
  newPassword: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("newPassword")).required(),
});

module.exports = {
  authSchema: authSchema,
  otpSchema: otpSchema,
  verifyOTPSchema: verifyOTPSchema,
  loginPasswordResetSchema: loginPasswordResetSchema,
  passwordResetSchema: passwordResetSchema,
};

import Joi from "@hapi/joi";

export const signUpSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  email: Joi.string().email().required().lowercase()
    .trim(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .message(
      "password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character"
    ),
  country: Joi.string(),
  gender: Joi.string(),
  region: Joi.string(),
  company: Joi.string(),
  occupation: Joi.string(),
  phoneNumber: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().required(),
  password: Joi.string().min(8).required(),
  inviteToken: Joi.string().trim().optional(),
});

export const updateUserSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim(),
  email: Joi.string().email().lowercase().trim(),
  emailNotify: Joi.boolean(),
  inAppNotify: Joi.boolean(),
  country: Joi.string().trim(),
  gender: Joi.string().trim(),
  region: Joi.string().trim(),
  company: Joi.string().trim(),
  bio: Joi.string(),
  phoneNumber: Joi.number(),
  linkedin: Joi.string().trim(),
  profilePic: Joi.object(),
  occupation: Joi.string().trim(),
  firstentry: Joi.boolean(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

export const changePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  emailToken: Joi.string(),
  id: Joi.string(),
});

export const loginPasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  oldPassword: Joi.string().min(8).required(),
});

export const quickCheckOutSchema = Joi.object({
  fullName: Joi.string()
    .trim()
    .required()
    .regex(/^([a-zA-Z]{3,})+\s([a-zA-Z]{3,})+$/)
    .message(
      "Please enter Full Name with at least 3 characters seperated by a space example John Doe"
    ),
  email: Joi.string().email().required().lowercase()
    .trim(),
});

export const adminCreateSchema = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  email: Joi.string().email().required().lowercase()
    .trim(),
  role: Joi.string().trim().required(),
});

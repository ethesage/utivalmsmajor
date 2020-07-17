import Joi from '@hapi/joi';

export const signUpSchema = Joi.object().keys({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  email: Joi.string().email().required().lowercase().trim(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/)
    .message(
      'password must contain at least 1 uppercase, 1 lowercase, 1 number and 1 special character'
    ),
  country: Joi.string().lowercase(),
  gender: Joi.string().lowercase(),
  region: Joi.string().lowercase(),
  company: Joi.string().lowercase(),
  occupation: Joi.string().lowercase(),
  phoneNumber: Joi.number(),
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
  emailNotify: Joi.boolean(),
  inAppNotify: Joi.boolean(),
  country: Joi.string().lowercase(),
  gender: Joi.string().lowercase(),
  region: Joi.string().lowercase(),
  company: Joi.string().lowercase(),
  bio: Joi.string(),
  phoneNumber: Joi.number(),
  linkedin: Joi.string().lowercase(),
  profilePic: Joi.object(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().trim().required(),
});

export const changePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
  emailToken: Joi.string().length(128).required(),
});

export const quickCheckOutSchema = Joi.object({
  fullName: Joi.string()
  .trim()
  .required()
  .regex(/^([a-zA-Z]{3,})+\s([a-zA-Z]{3,})+$/)
  .message(
    'Please enter Full Name with at least 3 characters seperated by a space example John Doe'
  ),
  email: Joi.string().email().required().lowercase().trim(),
})

export const adminCreateSchema= Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]{3,}$/)
    .trim()
    .required(),
  email: Joi.string().email().required().lowercase().trim(),
  role: Joi.string().trim().required(),
})

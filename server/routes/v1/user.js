/* eslint-disable no-return-assign */
import express from 'express';
import 'express-async-errors';
import {
  login,
  signup,
  resetPassword,
  changePassword,
  updateUser,
  quickCheckOut,
  adminCreate,
} from '../../controllers/user';
import middlewares from '../../middlewares';

const {
  validate,
  loginSchema,
  signUpSchema,
  changePasswordSchema,
  resetPasswordSchema,
  updateUserSchema,
  checkInvitation,
  quickCheckOutSchema,
  adminCreateSchema,
  usession,
} = middlewares;

const userRoutes = express();

userRoutes.post(
  '/reset_password_link',
  validate(resetPasswordSchema),
  resetPassword
);
userRoutes.post(
  '/change_password/',
  validate(
    changePasswordSchema,
    (req) => (req.body.emailToken = req.query.emailToken)
  ),
  changePassword
);
userRoutes.post('/login', validate(loginSchema), checkInvitation, login);
userRoutes.post('/signup', validate(signUpSchema), checkInvitation, signup);
userRoutes.post('/quickcheckout', validate(quickCheckOutSchema), quickCheckOut);
userRoutes.patch(
  '/update',
  usession.can(''),
  validate(updateUserSchema),
  updateUser
);
userRoutes.post(
  '/admin/create',
  usession.can('admin:create'),
  validate(adminCreateSchema),
  adminCreate
);

export default userRoutes;

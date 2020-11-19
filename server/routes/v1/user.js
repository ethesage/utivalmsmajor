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
  reset,
  getAllUsers,
  updateAccount,
  activateUser,
  deactivateUser,
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
  loginPasswordSchema,
} = middlewares;

const userRoutes = express();

userRoutes.post(
  '/reset_password_link',
  validate(resetPasswordSchema),
  resetPassword
);
userRoutes.post(
  '/change_password',
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
userRoutes.patch(
  '/login_reset',
  usession.can(''),
  validate(loginPasswordSchema),
  reset
);
userRoutes.post(
  '/admin/create',
  usession.can('admin:create'),
  validate(adminCreateSchema),
  adminCreate
);

userRoutes.get('/all', usession.can('admin:create'), getAllUsers);
userRoutes.patch('/activate/:id', usession.can('admin:create'), activateUser);
userRoutes.patch(
  '/deactivate/:id',
  usession.can('admin:create'),
  deactivateUser
);
userRoutes.patch(
  '/changeRole/:id/:role',
  usession.can('admin:create'),
  updateAccount
);

export default userRoutes;

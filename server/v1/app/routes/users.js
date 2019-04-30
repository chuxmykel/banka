import express from 'express';
import UserController from '../controllers/userController';
import InputValidator from '../middlewares/inputValidator';
import AuthenticateUser from '../middlewares/authenticateUser';

const userRoutes = express.Router();

userRoutes.post('/signup', InputValidator.validateUser, UserController.signUp);
userRoutes.post('/signin', InputValidator.validateLogin, UserController.signIn);
userRoutes.post('/passwordreset', UserController.sendResetMail);
userRoutes.get('/passwordreset/:id/:token', UserController.passwordReset);
userRoutes.post('/resetpassword', UserController.resetPassword);
userRoutes.post('/superuser',
  InputValidator.validateSuperUser,
  AuthenticateUser.verifyAdmin,
  UserController.superUser);

export default userRoutes;

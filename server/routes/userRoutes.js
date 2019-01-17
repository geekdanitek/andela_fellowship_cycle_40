import express from 'express';
import userController from '../controllers/userController';
import userValidations from '../validations/userValidations';
import Middleware from '../middlewares/middleware';
const router = express.Router();

router.post(
  '/auth/signup',
  userValidations.createUserValidation,
  Middleware.checkForEmailExistence,
  Middleware.checkForUsernameExistence,
  userController.createUser
);

router.post(
  '/auth/login',
  userValidations.loginUser,
  userController.loginUser
);

export default router;
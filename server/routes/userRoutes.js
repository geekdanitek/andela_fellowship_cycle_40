import express from 'express';
import userController from '../controllers/userController';
import userValidations from '../validations/userValidations';

const router = express.Router();


router.post(
  '/auth/signup',
  userValidations.createUserValidation,
  userController.createUser
);

router.post(
  '/auth/login',
  userValidations.loginUser,
  userController.loginUser
);

export default router;
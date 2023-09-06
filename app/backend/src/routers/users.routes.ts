import { Router } from 'express';
import UsersController from '../controller/Users.controller';
import UsersValidations from '../middlewares/UsersValidations';
import TokenValidation from '../middlewares/TokenValidation';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  UsersValidations.validateLogin,
  (req, res) => usersController.loginUser(req, res),
);

router.get(
  '/role',
  TokenValidation.validateToken,
  (req, res) => usersController.getRole(req, res),
);

export default router;

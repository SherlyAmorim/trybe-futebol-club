import { Router } from 'express';
import UsersController from '../controller/Users.controller';
import UsersValidations from '../middlewares/UsersValidations';

const usersController = new UsersController();

const router = Router();

router.post(
  '/',
  UsersValidations.validateLogin,
  (req, res) => usersController.loginUser(req, res),
);

export default router;

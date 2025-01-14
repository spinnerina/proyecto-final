import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const authRoute = Router();
const userController = new UserController();

authRoute.post('/login', userController.login);
authRoute.post('/register', userController.register);

export { authRoute };
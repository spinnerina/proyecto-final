import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const authRoute = Router();

authRoute.post('/login', UserController.login);
authRoute.post('/register', UserController.register);

export { authRoute };
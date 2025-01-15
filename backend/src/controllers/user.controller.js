import { User } from '../model/user.model.js';
import { loginSchemaValidator, registerSchemaValidator } from '../validators/user.validator.js';
import Middleware from '../middleware/middleware.js';

export default class UserController { 

    static async login(req, res) { 
        try{
            const { email, password } = req.body;
            const validate = loginSchemaValidator.safeParse({ email, password });

            if (!validate.success) {
                return res.status(400).send(validate.error.errors);
            }

            const user = await User.find({ email });

            if(user.length === 0) {
                return res.status(400).json({ error: "Incorrect data" });
            }
            
            const middleware = new Middleware();
            const validatePassword = await middleware.validatePassword(password, user[0].password);
            if(!validatePassword) {
                return res.status(400).json({ error: "Incorrect data" });
            }

            const token = await middleware.generateTokenSession(user[0].id, user[0].email);
            if(token == null){
                return res.status(400).json({  message: "Token not generated" });
            } 
    
            return res.status(200).json({ message: "Correct login", token: token });
        }catch(error) {
            console.log(error);
            res.status(500).json({ error: "Error to login" });
        }
    }

    static async register(req, res) {
        try{
            const { name, email, password } = req.body;
            const validate = registerSchemaValidator.safeParse({ name, email, password });

            if (!validate.success) {
                return res.status(400).send(validate.error.errors);
            }

            const user = new User(req.body);
            const middleware = new Middleware();
            user.password = await middleware.encrypt(password);
            await user.save();
            res.status(201).json(user);
        }catch(error) {
            res.status(500).json({ error: "Error to register" });
        }
    }
}
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export default class Middleware {

    async validateToken(req, res, next){
        let accessToken = req.headers.authorization;

        if (!accessToken) {
            return res.status(401).json({ message: 'Token no proporsionado' });
        }
        try{
            // Quitamos el Bearer del token:
            accessToken = accessToken.split(' ')[1];

            const decoded = jwt.verify(accessToken, process.env.SECRET_KEY);
            req.body.usu_id = decoded.id;
            next();
        }catch(err){
            return res.status(401).json({ message: 'Invalid token' });
        }
    }

    async encrypt(password){
        if(password){
            const ecrypt = await bcrypt.hash(password, 12);
            return ecrypt;
        }
        return null;
        
    }

    async validatePassword(password, passwordHash){
        const validate = await bcrypt.compare(password, passwordHash);
        return validate;
    }

    async generateTokenSession(id, username) {
        try{
            if(id != null && username != null){
                const token = jwt.sign({ id: id , username: username }, process.env.SECRET_KEY , { expiresIn: '1h' });
                return token;
            }
            return null;
        }catch(err){
            return null;
        }
        
    }
}
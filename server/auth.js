import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const expiresIn = '48h';
const secret = process.env.SECRET;

class Auth {
	static verifyToken(){

	}

	static generateToken(userTokenData) {
		const appToken = jwt.sign(
	      userTokenData,
	      secret,
	      {expiresIn: expiresIn}
	    );
	    return appToken;
	}
}

export default Auth;
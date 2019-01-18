import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const expiresIn = '48h';
const secret = process.env.SECRET || 'iamgeek';

class Auth {
	static async verifyToken(req, res, next){
		const requestToken = req.headers['x-access-token'] || req.body.token;
		
		  if (!requestToken) {
		  	return res.status(403).json({
		  		status: 403,
		      	error: 'Unauthorized Access! You cannot access this resource.',
		    });
		  }
		  try {

		  		const decoded = await jwt.verify(requestToken, secret);
			    req.decoded = decoded;

			    return next();

		  	} catch (error) {
		  		res.status(401).json({status: 401, error});
		  	}
		    
	}

	static isAdmin(req, res, next) {
		const isAdmin = req.decoded.isAdmin;
	    if (!isAdmin) {
	      return res.status(403).json({
	        status: 403,
	        error: 'Access denied.',
	      });
	    }

	    next();
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
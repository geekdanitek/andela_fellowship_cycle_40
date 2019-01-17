import bcrypt from 'bcryptjs';
import database from '../models/databaseConnection.js';
import auth from '../auth';
import Helpers from '../helpers/helpers';

class UserController {
	static async createUser(req, res){
		try {
			const {
					firstname, 
					lastname,
					othername,
					email,
					phoneNumber,
					password,
					username
				} = req.body;

			const encrpytPassword = bcrypt.hashSync(password.trim(), 8);
			const query = `INSERT INTO users (firstname, lastname, othername, email, password, phoneNumber, username)
							VALUES('${firstname}', '${lastname}', '${othername}', '${email}', '${encrpytPassword}', '${phoneNumber}', '${username}') RETURNING id;`;

			const response = await database.query(query);

			if(response){
				const userTokenData = {
		          id: response.rows[0].id,
		          username: username,
		          isAdmin: false
		        };

		        const generateToken = auth.generateToken(userTokenData); 

		        const data = [{
		        		token: generateToken,
		        		user: {firstname, lastname, othername, email, phoneNumber, password, username}
		        	}];
				return Helpers.successResponse(res, 201, data);
			}
			
		} catch (error) {

			Helpers.errorResponse(res, 500, error.message);
		}
	}

	static async loginUser(req, res) {
		try {
			const {email, password } = req.body;
			const query = `SELECT * FROM users WHERE email='${email}'`;

			let response = await database.query(query);
		
			const comparePassword = bcrypt.compareSync(password.trim(), response.rows[0].password);

			if(comparePassword) {
				const userTokenData = {
		          id: response.rows[0].id,
		          username: response.rows[0].username,
		          isAdmin: response.rows[0].isadmin
		        };

		        const generateToken = auth.generateToken(userTokenData);
		      	
		      	const user = response.rows[0];
		      	delete user.password;
		      	delete user.isadmin;
		        
		        return Helpers.successResponse(res, 201, [{ token: generateToken, user: user }]);
			}

			return Helpers.errorResponse(res, 400, 'Incorrect password');
			

		} catch (error) {
			Helpers.errorResponse(res, 500, error.message);
		}
	}
}
export default UserController;
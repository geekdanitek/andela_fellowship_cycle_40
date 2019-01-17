import Helpers from '../helpers/helpers';

class UserValidations {
	createUserValidation(req, res, next) {
		const {
				firstname, 
				lastname,
				othername,
				email,
				phoneNumber,
				password,
				username
			} = req.body;

		if(!firstname && !lastname && !othername && !email && !phoneNumber && !password && !username){
			return Helpers.errorResponse(res, 422, 'All fields are required, you must provide the firstname, lastname, othername, email, phonenumber, password and username');
		}

		let requiredFields = Helpers.isRequired(req.body, ['firstname', 'lastname', 'othername', 'email', 'phoneNumber', 'password', 'username']);
		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
			return Helpers.errorResponse(res, 422, requiredFields.map(error => error));
		}

		const errors = [];

		if(!Helpers.isAlphabetical(firstname)) {
			errors.push({firstname: 'Firstname field must be a valid Alphabetical string. e.g (A-Z, a-z)'});
		}

		if(!Helpers.isAlphabetical(lastname)) {
			errors.push({lastname: 'Lastname field must be a valid Alphabetical string. e.g (A-Z, a-z)'});
		}

		if(!Helpers.isAlphabetical(othername)) {
			errors.push({othername: 'Othername  field must be a valid Alphabetical string. e.g (A-Z, a-z)'});
		}

		if(!Helpers.isEmail(email)) {
			errors.push({email: 'Email field must be a valid email. e.g example@gmail.com'});
		}

		if(!Helpers.isNumber(phoneNumber)) {
			errors.push({phoneNumber: 'Phone Number field must be a valid Number'});
		}

		if(!Helpers.isLength(password, 5)) {
			errors.push({password: 'Password field must be more than 5 characters'});
		}

		if(!Helpers.isAlphaNumberical(username)){
			errors.push({username: 'Username field must be a valid Alphanumerical value'})
		}

		if(errors.length > 0){
			return Helpers.errorResponse(res, 422, errors.map(error => error));
	    }	

		next();
	}

	loginUser(req, res, next){
		const { email, password } = req.body;

		if(!email && !password) {
			return Helpers.errorResponse(res, 422, 'All fields are required, you must provide the Email and Password');
		}

		let requiredFields = Helpers.isRequired(req.body, ['email', 'password']);
		
		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
			return Helpers.errorResponse(res, 422, requiredFields.map(error => error));
		}

		const errors = [];

		if(!Helpers.isEmail(email)) {
			errors.push({email: 'Email field must be a valid email. e.g example@gmail.com'});
		}

		if(!Helpers.isLength(password, 5)) {
			errors.push({password: 'Password field must be more than 5 characters'});
		}

		if(errors.length > 0){
			return Helpers.errorResponse(res, 422, errors.map(error => error));
	    }

	    next();
	}
}

export default new UserValidations;
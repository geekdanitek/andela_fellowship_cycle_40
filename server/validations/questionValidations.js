import helpers from '../helpers/helpers';

class QuestionValidations {
	createQuestionValidation(req, res, next){

		const { title, body } = req.body;

		if(!title && !body){
	    	return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide the title and body'
		    });
	    }
		
		let requiredFields = helpers.isRequired(req.body, ['title', 'body']);

		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

	    const errors = [];

	  	if(title.length <= 5){
			errors.push({ title: 'Title should be more than 5 characters' });
		}

		if(body.length <= 5){
			errors.push({ body: 'Body should be more than 5 characters' });
		}

		if(errors.length > 0){
	    	return res.status(422).json({
	        status: 422,
	        error: errors.map(error => error),
	      });
	    }
		next();
	}
}

export default new QuestionValidations;
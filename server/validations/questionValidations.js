import helpers from '../helpers/helpers';

class QuestionValidations {
	createQuestionValidation(req, res, next){

		const { title, body, meetupId } = req.body;

		if(!title && !body && !meetupId){
	    	return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide the title, body and meetup id'
		    });
	    }
		
		let requiredFields = helpers.isRequired(req.body, ['title', 'body', 'meetupId']);

		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

	    const errors = [];
	    
	  	if(helpers.isLength(title, 1)){
			errors.push({ title: 'Title should be more than 5 characters' });
		}

		if(helpers.isLength(body, 1)){
			errors.push({ body: 'Body should be more than 5 characters' });
		}

		if(!helpers.isNumber(meetupId)) {
			errors.push({meetupId: 'Meetup id shoud be a number'});
		}

		if(errors.length > 0){
	    	return res.status(422).json({
	        status: 422,
	        error: errors.map(error => error),
	      });
	    }
		next();
	}

	createCommentValidation(req, res, next) {
		const { questionId, comment } = req.body;

		if(!questionId && !comment) {
			return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide the comment and question id'
		    });
		}

		let requiredFields = helpers.isRequired(req.body, ['questionId', 'comment']);

		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

		const errors = [];

		if(!helpers.isNumber(questionId)) {
			errors.push({questionId: 'Question id should be a number'});
		}

		if(helpers.isLength(comment, 1)){
			errors.push({ comment: 'Comment should be more than 1 characters' });
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
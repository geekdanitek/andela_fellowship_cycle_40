import helpers from '../helpers/helpers';
class MeetupValidations {
	
	createMeetupValidation(req, res, next){

		const { topic, location, happeningOn, tags} = req.body;

		if(!topic && !location && !happeningOn && !tags ){
	    	return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide the topic, location, happeningOn and tags'
		    });
	    }

		let requiredFields = helpers.isRequired(req.body, ['topic', 'location', 'happeningOn', 'tags']);
	
		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

		const errors = [];
		helpers.isLength(topic, 5)
		if(helpers.isLength(topic, 5)){
			errors.push({topic: 'Topic should be more than 5 characters'});
		}
		
		if(helpers.isLength(location, 5)){
			errors.push({location: 'Location should be more than 5 characters'});
		}

	    if(!helpers.isDateTime(happeningOn)){
	    	errors.push({happeningOn: 'HappeningOn should be a valid date time. e.g YYYY-MM-DD HH:MM:SS'});
	    }

	    if(!Array.isArray(tags)){
	    	errors.push({tags: 'Tags should be an array'});
	    } 

	   if(!helpers.stringArray(tags)) {
	   		errors.push({tags: 'All items in the tags array must be a string and cannot be empty'});
	   }

	    if(errors.length > 0){
	    	return res.status(422).json({
	        status: 422,
	        error: errors.map(error => error),
	      });
	    }

		next();
	}

	rsvpMeetupValidation(req, res, next) {
		const { response } = req.body;

		if(!response){
	    	return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide a "response" field'
		    });
	    }

	    let requiredFields = helpers.isRequired(req.body, ['response']);

		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

		const errors = [];

		const setStatus = ['yes', 'no', 'maybe'];
		if(!setStatus.includes(response)){
			errors.push({response: 'Response expects only "yes", "no" and "maybe"'});
		}

		if(errors.length > 0){
	    	return res.status(422).json({
	        status: 422,
	        error: errors.map(error => error),
	      });
	    }
	    
		next();
	}

	addTagsToMeetupValidation(req, res, next) {
		const { tags } = req.body;

		if(!tags){ 
			return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide a "tags" field'
		    });
		}

		let requiredFields = helpers.isRequired(req.body, ['tags']);

		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

		const errors = [];

	    if(!Array.isArray(tags)){
	    	errors.push({tags: 'Tags should be an array'});
	    } 

	   if(!helpers.stringArray(tags)) {
	   		errors.push({tags: 'All items in the tags array must be a string and cannot be empty'});
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

export default new MeetupValidations;
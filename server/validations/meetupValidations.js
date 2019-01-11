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

		if(topic.length <= 5){
			errors.push({topic: 'Topic should be more than 5 characters'});
		}
		if(location.length <= 5){
			errors.push({location: 'Location should be more than 5 characters'});
		}

		const dateFormat = /([0-2][0-9]{3})-([0-1][0-9])-([0-3][0-9]) ([0-5][0-9]):([0-5][0-9]):([0-5][0-9])(([\-\+]([0-1][0-9])\:00))?/;
	    if (!dateFormat.test(happeningOn)) {
	          errors.push({happeningOn: 'HappeningOn should be a valid date time'});
	    }

	    if(!Array.isArray(tags)){
	    	errors.push({tags: 'Tags should be an array'});
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
		const { topic, status } = req.body;

		if(!topic && !status){
	    	return res.status(422).json({
		        status: 422,
		        error: 'All fields are required, you must provide the topic and status'
		    });
	    }

	    let requiredFields = helpers.isRequired(req.body, ['topic', 'status']);

		if (typeof requiredFields == 'object' && requiredFields.length > 0) {
		    return res.status(422).json({
		      status: 422,
		      error: requiredFields.map(error => error)
		    });
		}

		const errors = [];
		if(topic.length <= 5){
			errors.push({topic: 'Topic should be more than 5 characters'});
		}

		const setStatus = ['yes', 'no', 'maybe'];
		if(!setStatus.includes(status)){
			errors.push({status: 'Status expects only "yes", "no" and "maybe"'});
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
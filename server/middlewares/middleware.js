import database from '../models/databaseConnection';
import Helpers from '../helpers/helpers';

class Middleware {

	static async checkForMeetupExistence(req, res, next) {
		try {

			const meetupId = req.body.meetupId || req.params.meetupId;
			
			const query = `SELECT * FROM meetups WHERE id='${Number(meetupId)}'`;
		
			const response = await database.query(query);
			
			if(response.rows.length < 1) {
				return Helpers.errorResponse(res, 404, 'Invalid meetup id');
			}

			next();

		} catch (error) {

			return Helpers.errorResponse(res, 500, error.message);
		}
	}

	static async checkForQuestionExistence(req, res, next) {

		try {

			const questionId = req.body.questionId || req.params.questionId;
			const query = `SELECT * FROM questions WHERE id='${questionId}'`;

			const response = await database.query(query);			

			if(response.rows.length < 1) {
				return Helpers.errorResponse(res, 404, 'Invaid question id');
			}

			req.question = response.rows[0];

			next();

		} catch (error) {

			
			return Helpers.errorResponse(res, 500, error.message);
		}

		
	}

	static  async checkForRsvpExistence(req, res, next){
		try {
			const query = `SELECT * FROM rsvps WHERE userId=${req.decoded.id} AND meetupId='${req.params.meetupId}'`;
			
			const response = await database.query(query);
			if(response.rows.length > 0) {
				return Helpers.errorResponse(res, 404, 'user already rsvp for this meetup');
				
			}

			next();

		} catch (error) {
			
			return Helpers.errorResponse(res, 500, error.message);
		}
	}

	static async checkForEmailExistence(req, res, next){	
		try {

			const { email } = req.body; 
			const query = `SELECT * FROM users WHERE email='${email}'`;

			const response = await database.query(query);
			if(response.rows.length > 0) {
				return Helpers.errorResponse(res, 404, 'email already in use');
			}

			next();
	

		} catch (error) {
			return Helpers.errorResponse(res, 500, error.message);
		}
	}
	static async checkForUsernameExistence(req, res, next) {
		try {
			const { username } = req.body;
			const query = `SELECT * FROM users WHERE username='${username}'`;

			const response = await database.query(query);
			if(response.rows.length > 0) {
				return Helpers.errorResponse(res, 404, 'username already in use');
			}
			
			next();

		} catch (error) {
			return Helpers.errorResponse(res, 500, error.message);
		}
	}
}

export default Middleware;
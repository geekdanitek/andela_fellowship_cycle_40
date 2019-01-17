import Helpers from '../helpers/helpers';
import database from '../models/databaseConnection.js';

class MeetupController {
  static async createMeetup(req, res) {
      try {
        const { topic, location, happeningOn, tags } = req.body;
        const query = `
                      INSERT INTO meetups (topic,location,happeningOn,tags) 
                      VALUES ('${topic}', '${location}', '${happeningOn}', '{"${tags}"}')`;

        const response = await database.query(query);
        if(response){
          Helpers.successResponse(res, 201, [{topic, location, happeningOn, tags}]);
        }

    } catch (error) {

      Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async getMeetup(req, res) {
    try {

      const { meetupId } = req.params;
      const query =  `SELECT * FROM meetups WHERE id='${meetupId}'`;
      const response = await database.query(query);

      if(response.rows.length < 1) {
        return Helpers.errorResponse(res, 404, 'Meetup not found');
      }
      
      const meetup = response.rows[0];
      meetup.happeningon = Helpers.dateFormatter(String(meetup.happeningon));

       Helpers.successResponse(res, 201, [meetup]);

    } catch (error) {

       Helpers.errorResponse(res, 500, error.message);
    }
    
  }

  static async getMeetups(req, res) {
    try {

      const query =  `SELECT * FROM meetups`;
      const response = await database.query(query);

      if(response.rows.length < 1) {
        return Helpers.errorResponse(res, 404, 'Meetups not found');
      }
      
      const meetups = response.rows;

      const newMeetups = [];
      meetups.map(meetup => {
        newMeetups.push({
          id: meetup.id,
          topic: meetup.topic,
          location: meetup.location,
          happeningon: Helpers.dateFormatter(String(meetup.happeningon)),
          image: meetup.image,
          tags: meetup.tags,
          createdon: meetup.createdon

        })
      })
      Helpers.successResponse(res, 201, newMeetups);

    } catch (error) {

        Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async deleteMeetup(req, res) {
    try {
       const { meetupId } = req.params;

       const query = ` DELETE FROM meetups WHERE id='${meetupId}'`;

       const response = await database.query(query);

       if(response) {
          return Helpers.successResponse(res, 201, [{meetup: 'Meetup successfully deleted'}]);
       }

    } catch (error) {
        return Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async rsvpForMeetup(req, res) {
    try {

      const { meetupId } = req.params;

      const { response } = req.body;

      const query =  `INSERT INTO rsvps (meetupId, userId, response)
                      VALUES ('${Number(meetupId)}', '${req.decoded.id}', '${response}')
                      `;

      const responseDb = await database.query(query);

      if(responseDb) {
        return Helpers.successResponse(res, 201, [{ meetup: Number(meetupId), user: req.decoded.id, response }]);
      }

    } catch (error) {
      return Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async addTagsToMeetup(req, res) {
    try {

      const { meetupId } = req.params;
      const { tags } = req.body;

      const query = `UPDATE meetups SET tags = array_cat(tags, '{${tags}}') WHERE id='${meetupId}' RETURNING *`;

      const response = await database.query(query);
      
      if(response) {
        const { id, topic, tags } = response.rows[0];
        return Helpers.successResponse(res, 201, [{meetup: id, topic, tags}]);
      }
    } catch (error) {
      return Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async getUpcomingMeetups(req, res) {
    
    try {
      const query = `SELECT * FROM meetups WHERE happeningOn >= CURRENT_TIMESTAMP ORDER BY createdon DESC`;
      
      const response = await database.query(query);
      
      if(response.rows.length < 1) {
        return Helpers.errorResponse(res, 404, 'No upcoming meetups currently');
      }
      
      const meetups = response.rows;

      const newMeetups = [];
      meetups.map(meetup => {
        newMeetups.push({
          id: meetup.id,
          topic: meetup.topic,
          location: meetup.location,
          happeningon: Helpers.dateFormatter(String(meetup.happeningon)),
          image: meetup.image,
          tags: meetup.tags,
          createdon: meetup.createdon

        })
      })
      Helpers.successResponse(res, 201, newMeetups);

    } catch (error) {
       Helpers.errorResponse(res, 500, error.message);
    }

  }
}

export default MeetupController;

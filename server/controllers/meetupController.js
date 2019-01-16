import meetupsMock from '../mocks/meetupsmock';
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

  static rsvpForMeetup(req, res) {
    const { meetupId } = req.params;

    const { topic, status } = req.body;

    return res.status(201).json({
      status: 201,
      data: [{
        meetup: Number(meetupId),
        topic,
        status,
      }],
    });
  }

  static getUpcomingMeetups(req, res) {
    const error = false;
    if (error) {
      return res.status(500).json({
        status: 500,
        error: 'Was not able to get upcoming meetups',
      });
    }

    const upcomingMeetups = meetupsMock.slice(4, 6);


    return res.status(200).json({
      status: 200,
      data: upcomingMeetups,
    });
  }
}

export default MeetupController;

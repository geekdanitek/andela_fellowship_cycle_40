import meetupsMock from '../mocks/meetupsmock';
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
           res.status(201).json({
            status: 201,
            data: [{
              topic,
              location,
              happeningOn,
              tags
            }],
          });
        }

    } catch (error) {
      res.json({
        error
      });
    }
  }

  static getMeetup(req, res) {
    const { meetupId } = req.params;

    const error = false;
    if (error) {
      return res.status(500).json({
        status: 500,
        error: 'Was not able to get meetup',
      });
    }

    const meetupIndex = meetupsMock.findIndex(meetup => meetup.id == meetupId);

    if (meetupIndex === -1) {
      return res.status(200).json({
        status: 200,
        data: [],
      });
    }

    const meetup = meetupsMock[meetupIndex];

    return res.status(200).json({
      status: 200,
      data: [meetup],
    });
  }

  static getMeetups(req, res) {
    const error = false;
    if (error) {
      return res.status(500).json({
        status: 500,
        error: 'Was not able to get meetups',
      });
    }

    const meetups = meetupsMock;

    return res.status(200).json({
      status: 200,
      data: meetups,
    });
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

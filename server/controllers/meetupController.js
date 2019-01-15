import meetupsMock from '../mocks/meetupsmock';

class MeetupController {
  static createMeetup(req, res) {
    const {
      topic, location, happeningOn, tags,
    } = req.body;
    return res.status(201).json({
      status: 201,
      data: [{
        id: 112,
        topic,
        location,
        happeningOn,
        tags,
      }],
    });
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
    console.log(upcomingMeetups, '>>>>>>>>>>>>>>>>>>');
    console.log(meetupsMock, 'meetupdssssssssssssssssssssssss');

    return res.status(200).json({
      status: 200,
      data: upcomingMeetups,
    });
  }
}

export default MeetupController;

const { validationResult } = require('express-validator/check');
const meetupsMock = require('../mocks/meetupsmock.json');

exports.createMeetup = (req, res) => {
  let errors = [];

  if (!req.body.topic) {
    errors.push('Topic field is required');
  }

  if (!req.body.location) {
    errors.push('Location field is required');
  }

  if (!req.body.happeningOn) {
    errors.push('Happening On field is required');
  }

  if (!req.body.tags) {
    errors.push('Tags field is required');
  }

  if (errors.length > 0) {
    return res.status(422).json({
      status: 422,
      error: errors.map(error => error).toString()
    });
  }

  errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errors.array().map(error => error.msg).toString(),
    });
  }
  const {
    topic, location, happeningOn, tags,
  } = req.body;

  return res.status(201).json({
    status: 201,
    data: [{
      topic,
      location,
      happeningOn,
      tags,
    }],
  });
};
exports.getMeetup = (req, res) => {
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
};
exports.getMeetups = (req, res) => {
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
};
exports.rsvpForMeetup = (req, res) => {
  let errors = [];

  if (!req.body.topic) {
    errors.push('Topic field is required');
  }

  if (!req.body.status) {
    errors.push('Status field is required');
  }

  if (errors.length > 0) {
    return res.status(422).json({
      status: 422,
      error: errors.map(error => error).toString(),
    });
  }

  errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      error: errors.array().map(error => error.msg).toString(),
    });
  }

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
};

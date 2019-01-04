const { validationResult } = require('express-validator/check');

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

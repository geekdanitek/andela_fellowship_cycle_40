const { validationResult } = require('express-validator/check');

exports.createQuestion = (req, res) => {
  let errors = [];

  if (!req.body.title) {
    errors.push('Title field is required');
  }

  if (!req.body.body) {
    errors.push('Body field is required');
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

  const { title, body } = req.body;

  return res.status(201).json({
    status: 201,
    data: [{
      user: 231,
      meetup: 112,
      title,
      body,
    }],
  });
};

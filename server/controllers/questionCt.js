const { validationResult } = require('express-validator/check');
const questionsMock = require('../mocks/questionsmock.json');

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
exports.upvoteQuestion = (req, res) => {
  const { questionId } = req.params;

  const questionIndex = questionsMock.findIndex(question => question.id == questionId);

  if (questionIndex === -1) {
    return res.status(404).json({
      status: 404,
      error: 'Question not found on the server',
    });
  }

  const question = questionsMock[questionIndex];
  question.votes += 1;

  return res.status(200).json({
    status: 200,
    data: [question],
  });
};

exports.downvoteQuestion = (req, res) => {
  const { questionId } = req.params;

  const questionIndex = questionsMock.findIndex(question => question.id == questionId);

  if (questionIndex === -1) {
    return res.status(404).json({
      status: 404,
      error: 'Question not found on the server',
    });
  }

  const question = questionsMock[questionIndex];

  if (question.votes !== 0) {
      question.votes -= 1;
  }

  return res.status(200).json({
    status: 200,
    data: [question],
  });
};
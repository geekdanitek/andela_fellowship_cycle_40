const express = require('express');
const { body } = require('express-validator/check');
const questionController = require('../controllers/questionCt');


const router = express.Router();

router.post(
  '/questions',
  [
    body('title')
      .trim()
      .isLength({ min: 5 }).withMessage('Title should be more than 5 characters'),
    body('body', 'Body should be more than 5 characters')
      .trim()
      .isLength({ min: 5 }),
  ],
  questionController.createQuestion,
);


module.exports = router;

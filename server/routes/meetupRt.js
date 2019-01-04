const express = require('express');
const { body } = require('express-validator/check');
const meetupController = require('../controllers/meetupCt');

const router = express.Router();


router.post(
  '/meetup',
  [
    body('topic', 'Topic should be more than 5 characters')
      .trim()
      .isLength({ min: 5 }),
    body('location', 'Location should be more than 5 characters')
      .trim()
      .isLength({ min: 5 }),
    body('happeningOn', 'HappeningOn should be a valid date time')
      .custom((value) => {
        const dateFormat = /([0-2][0-9]{3})-([0-1][0-9])-([0-3][0-9]) ([0-5][0-9]):([0-5][0-9]):([0-5][0-9])(([\-\+]([0-1][0-9])\:00))?/;
        if (!dateFormat.test(value)) {
          return false;
        }
        return true;
      }),
    body('tags', 'Tags should be an array')
      .isArray(),
  ],
  meetupController.createMeetup,
);

module.exports = router;

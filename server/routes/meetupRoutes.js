import express from 'express';
import meetupController from '../controllers/meetupController';
import meetupValidations from '../validations/meetupValidations';

const router = express.Router();

router.get('/meetups/upcoming', meetupController.getUpcomingMeetups);
router.get('/meetups/:meetupId', meetupController.getMeetup);
router.get('/meetups', meetupController.getMeetups);

router.post(
  '/meetups/:meetupId/rsvps',
  meetupValidations.rsvpMeetupValidation,
  meetupController.rsvpForMeetup,
);

router.post(
  '/meetup',
  meetupValidations.createMeetupValidation, 
  meetupController.createMeetup,
);

export default router;

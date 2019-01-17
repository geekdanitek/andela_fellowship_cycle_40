import express from 'express';
import meetupController from '../controllers/meetupController';
import meetupValidations from '../validations/meetupValidations';
import Auth from '../auth';
import Middleware from '../middlewares/middleware';

const router = express.Router();

router.get(
	'/meetups/upcoming', 
	Auth.verifyToken,
	meetupController.getUpcomingMeetups
);

router.get(
	'/meetups/:meetupId',
	Auth.verifyToken,
 	meetupController.getMeetup
);

router.delete(
	'/meetups/:meetupId',
	Auth.verifyToken,
	Auth.isAdmin,
	Middleware.checkForMeetupExistence,
 	meetupController.deleteMeetup
);

router.get('/meetups', 
	Auth.verifyToken,
	meetupController.getMeetups
);

router.post(
  '/meetups/:meetupId/rsvps',
  Auth.verifyToken,
  meetupValidations.rsvpMeetupValidation,
  Middleware.checkForMeetupExistence,
  Middleware.checkForRsvpExistence,
  meetupController.rsvpForMeetup
);

router.post(
  '/meetups/:meetupId/tags',
  Auth.verifyToken,
  Auth.isAdmin,
  meetupValidations.addTagsToMeetupValidation,
  Middleware.checkForMeetupExistence,
  meetupController.addTagsToMeetup
);

router.post(
  '/meetup',
  Auth.verifyToken,
  Auth.isAdmin,
  meetupValidations.createMeetupValidation, 
  meetupController.createMeetup
);

export default router;

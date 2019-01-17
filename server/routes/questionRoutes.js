import express from 'express';
import questionController from '../controllers/questionController';
import questiionValidations from '../validations/questionValidations';
import Auth from '../auth';
import Middleware from '../middlewares/middleware';

const router = express.Router();

router.post(
  '/questions',
  Auth.verifyToken,
  questiionValidations.createQuestionValidation,
  Middleware.checkForMeetupExistence,
  questionController.createQuestion
);

router.post(
	'/comments',
	Auth.verifyToken,
	questiionValidations.createCommentValidation,
	Middleware.checkForQuestionExistence,
	questionController.commentQuestion
);

router.patch(
	'/questions/:questionId/upvote',
	Auth.verifyToken,
	Middleware.checkForQuestionExistence,
	questionController.upvoteQuestion
);
router.patch(
	'/questions/:questionId/downvote', 
	Auth.verifyToken,
	Middleware.checkForQuestionExistence,
	questionController.downvoteQuestion
);

export default router;
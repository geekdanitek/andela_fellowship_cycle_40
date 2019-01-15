import express from 'express';
import questionController from '../controllers/questionController';
import questiionValidations from '../validations/questionValidations';

const router = express.Router();

router.post(
  '/questions',
  questiionValidations.createQuestionValidation,
  questionController.createQuestion,
);

router.patch('/questions/:questionId/upvote', questionController.upvoteQuestion);
router.patch('/questions/:questionId/downvote', questionController.downvoteQuestion);

export default router;
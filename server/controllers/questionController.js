import questionsMock from '../mocks/questionsmock';

class QuestionController {
  static createQuestion(req, res) {
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
  }

  static upvoteQuestion(req, res) {
    const { questionId } = req.params;

    const questionIndex = questionsMock.findIndex(question => question.id == questionId);

    if (questionIndex === -1) {
      return res.status(404).json({
        status: 404,
        error: 'Question not found',
      });
    }

    const question = questionsMock[questionIndex];
    question.votes += 1;

    return res.status(200).json({
      status: 200,
      data: [question],
    });
  }

  static downvoteQuestion(req, res) {
    const { questionId } = req.params;

    const questionIndex = questionsMock.findIndex(question => question.id == questionId);

    if (questionIndex === -1) {
      return res.status(404).json({
        status: 404,
        error: 'Question not found',
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
  }
}
export default QuestionController;

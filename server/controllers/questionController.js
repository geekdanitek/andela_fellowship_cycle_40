import questionsMock from '../mocks/questionsmock';
import database from '../models/databaseConnection';
import Helpers from '../helpers/helpers';

class QuestionController {
  static async createQuestion(req, res) {

    try {

      const { title, body, meetupId } = req.body;
      const query = `INSERT INTO questions (createdBy, meetupId, title, body)
                      VALUES('${req.decoded.id}', '${meetupId}', '${title}', '${body}')`;

      const response = await database.query(query);

      const data =  [{user: req.decoded.id, meetup: Number(meetupId), title, body}];

      return Helpers.successResponse(res, 201, data);

    } catch (error){
        return Helpers.errorResponse(res, 500, error.message);
    }

  }

  static async upvoteQuestion(req, res) {
    try {

       const { questionId } = req.params;
       const query = `UPDATE questions SET votes = votes + 1 WHERE id='${questionId}' RETURNING *`;

       const response = await database.query(query);
       if(response){
          const { meetup, title, body, votes} = response.rows[0];
          const data = [{ meetup, title, body, votes }];

          return Helpers.successResponse(res, 201, data);
       } 
      

    } catch (error) {
          return Helpers.errorResponse(res, 500, error.message);
    } 
  }

  static async downvoteQuestion(req, res) {
       try {

       const { questionId } = req.params;
       const query = `UPDATE questions SET votes = votes - 1 WHERE id='${questionId}' RETURNING *`;

       const response = await database.query(query);
       if(response){
          const { meetup, title, body, votes} = response.rows[0];
          const data = [{ meetup, title, body, votes }];

          return Helpers.successResponse(res, 201, data);
       } 
      

      } catch (error) {
            return Helpers.errorResponse(res, 500, error.message);
      }
  }

  static async commentQuestion(req, res){
    try {
      const { questionId, comment } = req.body;

      const query = `INSERT INTO comments (questionId, comment, userId)
                     VALUES ('${Number(questionId)}', '${comment}', '${req.decoded.id}')`;

      const response = await database.query(query);
  
      const data = [{
                      question: Number(questionId),
                      title: req.question.title,
                      body: req.question.body,
                      comment: comment
                  }];

      return Helpers.successResponse(res, 201, data);

    } catch (error) {
      return Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async getQuestion(req, res) {
    try {
      const { questionId } = req.params;
      const query = `SELECT * FROM questions where id='${Number(questionId)}'`;
      const response = await database.query(query);
      if(response) {
        const data = response.rows[0];
        data.createdon = Helpers.dateFormatter(String(data.createdon));
        return Helpers.successResponse(res, 201, data);
      } 
    } catch (error) {
      return Helpers.errorResponse(res, 500, error.message);
    }
  }

  static async getComments(req, res) {
    try {
      const { questionId } = req.params;
      const query = `SELECT *, (SELECT row_to_json(users) FROM (
        SELECT firstname, lastname FROM users WHERE id=comments.userid
       ) users) AS user FROM comments WHERE comments.questionid='${Number(questionId)}' ORDER BY comments.createdon DESC`;
      const response = await database.query(query);
      if(response) {
        const data = response.rows;
        const comments = [];
        data.map((comment) => {
          comments.push({
            id: comment.id,
            questionid: comment.questionid,
            comment: comment.comment,
            user: comment.user,
            createdon: Helpers.dateFormatter(String(comment.createdon)),
          });
        });
        return Helpers.successResponse(res, 201, comments);
      }
    } catch (error) {
      return Helpers.errorResponse(res, 500, error.message);
    }
  }
}
export default QuestionController;

import chai from 'chai';

import chaiHttp from 'chai-http';

process.env.NODE_ENV = 'test';

import server from '../app';

const { expect } = chai;
const  should = chai.should();

chai.use(chaiHttp);

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJnZWVrIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTQ3NzM1Njk1LCJleHAiOjE1NDc5MDg0OTV9.0o1MfpJGF3hGkog9aJtQz8_x7jcc3tonzlIG20XtWDA';

// before((done) => {
//   chai.request(server)
//       .post('/api/v1/auth/login')
//       .send({ email: "adenew1234675558@gmail.com", password: "ade123" },)
//       .end((err, res) => {
//         if(err) {
//           return err;
//         }

//         token = res.body.data[0].token;
//         return done();
//        });
// });

describe('/Create a question', () => {
	it('it should not create a new question without title field', (done) => {
		chai.request(server)
		.post('/api/v1/questions')
		.set('x-access-token', token)
		.send({body: 'The lorum of the ipsum',})
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('array');
			res.body.error[0].should.be.a('object');
      		res.body.error[0].title.should.have.eql('title field is required');
			done();
		});
	});

	it('it should not create a new question without body field', (done) => {
		
		chai.request(server)
		.post('/api/v1/questions')
		.set('x-access-token', token)
		.send({title: 'The lorum',})
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('array');
			res.body.error[0].should.be.a('object');
      		res.body.error[0].body.should.have.eql('body field is required');
			done();
		});
	});

	it('it should not create a new question if title characters is less than 5', (done) => {
	
		chai.request(server)
		.post('/api/v1/questions')
		.set('x-access-token', token)
		.send({
			title: 'The',
			body: 'The lorum of the ipsum',
			meetupId: 1
		})
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('array');
			res.body.error[0].should.be.a('object');
      		res.body.error[0].title.should.have.eql('Title should be more than 5 characters');
			done();
		});
	});

	it('it should not create a new question if body characters is less than 5', (done) => {
		
		chai.request(server)
		.post('/api/v1/questions')
		.set('x-access-token', token)
		.send({
			title: 'The lorum',
			body: 'lor',
			meetupId: 1
		})
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('array');
			res.body.error[0].should.be.a('object');
      		res.body.error[0].body.should.have.eql('Body should be more than 5 characters');
			done();
		});
	});

	it('it should create a new question', (done) => {
	
		chai.request(server)
		.post('/api/v1/questions')
		.set('x-access-token', token)
		.send({
			title: 'lolsdddd',
			body: 'lollllllllllll',
			meetupId: 1
		})
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.data[0].should.have.property('title');
			res.body.data[0].should.have.property('body');
			done();
		});
	});
});
describe('/Question Vote', () => {
	it('it should not upvote a question if the question id is invalid', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/245/upvote')
		.set('x-access-token', token)
		.end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Invaid question id');
			done();
		});
	});

	it('it should not downvote a question if the question id is invalid', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/245/downvote')
		.set('x-access-token', token)
		.end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Invaid question id');
			done();
		});
	});

	it('it should upvote a question', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/1/upvote')
		.set('x-access-token', token)
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.data.should.be.a('array');
			res.body.data[0].should.have.property('title');
			res.body.data[0].should.have.property('body');
			res.body.data[0].should.have.property('votes');
			done();
		});
	});

	it('it should downvote a question', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/1/downvote')
		.set('x-access-token', token)
		.end((err, res) => {
			res.should.have.status(201);
			res.body.should.be.a('object');
			res.body.data.should.be.a('array');
			res.body.data[0].should.have.property('title');
			res.body.data[0].should.have.property('body');
			res.body.data[0].should.have.property('votes');
			done();
		});
	});
});
const chai = require('chai');

const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';

const server = require('../app');

const { expect } = chai;
const  should = chai.should();

chai.use(chaiHttp);

describe('/Create a question', () => {
	it('it should not create a new question without title field', (done) => {
		const question = {
			body: 'The lorum of the ipsum',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(question)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Title field is required');
			done();
		});
	});

	it('it should not create a new question without body field', (done) => {
		const question = {
			title: 'The lorum',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(question)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Body field is required');
			done();
		});
	});

	it('it should not create a new question if title characters is less than 5', (done) => {
		const question = {
			title: 'The',
			body: 'The lorum of the ipsum',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(question)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Title should be more than 5 characters');
			done();
		});
	});

	it('it should not create a new question if body characters is less than 5', (done) => {
		const question = {
			title: 'The lorum',
			body: 'lor',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(question)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Body should be more than 5 characters');
			done();
		});
	});

	it('it should not create a new question without body field', (done) => {
		const question = {
			title: 'The lorum',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(question)
		.end((err, res) => {
			res.should.have.status(422);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Body field is required');
			done();
		});
	});

	it('it should create a new question', (done) => {
		const question = {
			title: 'lolsdddd',
			body: 'lollllllllllll',
		};
		chai.request(server)
		.post('/api/v1/questions')
		.send(question)
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
		.end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Question not found on the server');
			done();
		});
	});

	it('it should not downvote a question if the question id is invalid', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/245/downvote')
		.end((err, res) => {
			res.should.have.status(404);
			res.body.should.be.a('object');
			res.body.error.should.be.a('string');
			res.body.should.have.property('error').eql('Question not found on the server');
			done();
		});
	});

	it('it should upvote a question', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/24/upvote')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.data.should.be.a('array');
			res.body.data[0].should.have.property('id');
			res.body.data[0].should.have.property('createdOn');
			res.body.data[0].should.have.property('createdBy');
			res.body.data[0].should.have.property('meetup');
			res.body.data[0].should.have.property('title');
			res.body.data[0].should.have.property('body');
			res.body.data[0].should.have.property('votes');
			done();
		});
	});

	it('it should downvote a question', (done) => {
		chai.request(server)
		.patch('/api/v1/questions/24/downvote')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.data.should.be.a('array');
			res.body.data[0].should.have.property('id');
			res.body.data[0].should.have.property('createdOn');
			res.body.data[0].should.have.property('createdBy');
			res.body.data[0].should.have.property('meetup');
			res.body.data[0].should.have.property('title');
			res.body.data[0].should.have.property('body');
			res.body.data[0].should.have.property('votes');
			done();
		});
	});
});
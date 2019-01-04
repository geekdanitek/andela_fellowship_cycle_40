const chai = require('chai');

const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';

const server = require('../app');

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe('/Create meetup', () => {
  it('it should not create a meetup without topic field', (done) => {
    const meetup = {
      location: 'Lagos',
      happeningOn: '2018-12-01 15:00:00',
      tags: [],
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Topic field is required');
        done();
      });
  });

  it('it should not create a meetup without location field', (done) => {
    const meetup = {
      topic: 'The Tech group',
      happeningOn: '2018-12-01 15:00:00',
      tags: [],
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Location field is required');
        done();
      });
  });

  it('it should not create a meetup without happening on field', (done) => {
    const meetup = {
      topic: 'The Tech group',
      location: 'Ikeja, Lagos',
      tags: [],
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Happening On field is required');
        done();
      });
  });

  it('it should not create a meetup without tags field', (done) => {
    const meetup = {
      topic: 'The Tech group',
      location: 'Ikeja, Lagos',
      happeningOn: '2018-12-08 15:00:00',
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Tags field is required');
        done();
      });
  });

  it('it should not create a meetup if topic characters is less than 5', (done) => {
    const meetup = {
      topic: 'The',
      location: 'Ikeja, Lagos',
      happeningOn: '2018-12-08 15:00:00',
      tags: [],
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Topic should be more than 5 characters');
        done();
      });
  });

  it('it should not create a meetup if location characters is less than 5', (done) => {
    const meetup = {
      topic: 'The Tech Event',
      location: 'Ike',
      happeningOn: '2018-12-08 15:00:00',
      tags: [],
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Location should be more than 5 characters');
        done();
      });
  });

  it('it should not create a meetup if happening on is not a valid date', (done) => {
    const meetup = {
      topic: 'The Tech Event',
      location: 'Ikeja, Lagos',
      happeningOn: '2018 15:00:00',
      tags: [],
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('HappeningOn should be a valid date time');
        done();
      });
  });

  it('it should not create a meetup if tags is not an array', (done) => {
    const meetup = {
      topic: 'The Tech Event',
      location: 'Ikeja, Lagos',
      happeningOn: '2018-01-11 15:00:00',
      tags: 'tech',
    };

    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        res.body.should.have.property('error').eql('Tags should be an array');
        done();
      });
  });

  it('it should create a new meetup', (done) => {
    const meetup = {
      topic: 'lolsdddd',
      location: 'Lagos',
      happeningOn: '2018-12-01 15:00:00',
      tags: [],
    };
    chai.request(server)
      .post('/api/v1/meetup')
      .send(meetup)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.data[0].should.have.property('topic');
        res.body.data[0].should.have.property('location');
        res.body.data[0].should.have.property('happeningOn');
        res.body.data[0].should.have.property('tags');
        done();
      });
  });
});

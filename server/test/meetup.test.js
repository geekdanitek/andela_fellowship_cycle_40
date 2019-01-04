const chai = require('chai');

const chaiHttp = require('chai-http');

process.env.NODE_ENV = 'test';

const server = require('../app');

const { expect } = chai;
const should = chai.should();

chai.use(chaiHttp);

describe('/GET meetups', () => {
  it('it should get all the meetups', (done) => {
    chai.request(server)
            .get('/api/v1/meetups')
            .end((err, res) => {
                  res.should.have.status(200);
                  expect(res.body.data).to.be.a('array');
              done();
          });
  });
});
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
describe('/GET/:meetupId Meetup', () => {
  it('it should GET a meet by the given id', (done) => {
    const meetup = {
            id: 112,
            title: 'React Submit 2018',
            location: 'The Civic Center, Lagos.',
            happeningOn: '2018-30-12 08:00:00',
            tags: [],
          };
            chai.request(server)
            .get(`/api/v1/meetups/${meetup.id}`)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('id').eql(meetup.id);
              res.body.data[0].should.have.property('title');
              res.body.data[0].should.have.property('location');
              res.body.data[0].should.have.property('happeningOn');
              res.body.data[0].should.have.property('tags');
              done();
            });
  });
});
import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../app';
import migration from '../models/migration.js';

const { expect } = chai;
const should = chai.should();

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
//         console.log(res.body);
//         token = res.body.data[0].token;
//         return done();
//        });
// });

describe('/GET meetups', () => {
  it('it should get all the meetups', (done) => {
    chai.request(server)
            .get('/api/v1/meetups')
            .set('x-access-token', token)
            .end((err, res) => {
                  res.should.have.status(201);
                  expect(res.body.data).to.be.a('array');
              done();
          });
  });
});
describe('/Create meetup', () => {
  it('it should not create a meetup without topic field', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
        location: 'Lagos',
        happeningOn: '2018-12-01 15:00:00',
        tags: [],
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].topic.should.have.eql('topic field is required');
        done();
      });
  });

  it('it should not create a meetup without location field', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
         topic: 'The Tech group',
         happeningOn: '2018-12-01 15:00:00',
         tags: [],
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].location.should.have.eql('location field is required');
        done();
      });
  });

  it('it should not create a meetup without happening on field', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
       .set('x-access-token', token)
      .send({
        topic: 'The Tech group',
        location: 'Ikeja, Lagos',
        tags: [],
        })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].happeningOn.should.have.eql('happeningOn field is required');
        done();
      });
  });

  it('it should not create a meetup without tags field', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
          topic: 'The Tech group',
          location: 'Ikeja, Lagos',
          happeningOn: '2018-12-08 15:00:00',
        })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].tags.should.have.eql('tags field is required');
        done();
      });
  });

  it('it should not create a meetup if topic characters is less than 5', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
          topic: 'The',
          location: 'Ikeja, Lagos',
          happeningOn: '2018-12-08 15:00:00',
          tags: [],
        })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].topic.should.have.eql('Topic should be more than 5 characters');
        done();
      });
  });

  it('it should not create a meetup if location characters is less than 5', (done) => {
    
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
        topic: 'The Tech Event',
        location: 'Ike',
        happeningOn: '2018-12-08 15:00:00',
        tags: [],
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].location.should.have.eql('Location should be more than 5 characters');
        done();
      });
  });

  it('it should not create a meetup if happening on is not a valid date', (done) => {
    
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
         topic: 'The Tech Event',
         location: 'Ikeja, Lagos',
         happeningOn: '2018 15:00:00',
         tags: [],
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].happeningOn.should.have.eql('HappeningOn should be a valid date time. e.g YYYY-MM-DD HH:MM:SS');
        done();
      });
  });

  it('it should not create a meetup if tags is not an array', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
         topic: 'The Tech Event',
         location: 'Ikeja, Lagos',
         happeningOn: '2018-01-11 15:00:00',
         tags: 'tech',
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.error.should.be.a('array');
        res.body.error[0].should.be.a('object');
        res.body.error[0].tags.should.have.eql('Tags should be an array');
        done();
      });
  });

  it('it should create a new meetup', (done) => {
    chai.request(server)
      .post('/api/v1/meetup')
      .set('x-access-token', token)
      .send({
        topic: 'lolsdddd',
        location: 'Lagosyy',
        happeningOn: '2018-12-01 15:00:00',
        tags: [],
      })
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

  it('it should not GET a meetup if the given id is not found', (done) => {
    const meetup = {
            id: 112,
            title: 'React Submit 2018',
            location: 'The Civic Center, Lagos.',
            happeningOn: '2018-30-12 08:00:00',
            tags: [],
          };
            chai.request(server)
            .get(`/api/v1/meetups/${meetup.id}`)
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.error.should.be.a('string').eql('Meetup not found');   
              done();
            });
  });

  it('it should GET a meet by the given id', (done) => {
    const meetup = {
            id: 1,
            title: 'React Submit 2018',
            location: 'The Civic Center, Lagos.',
            happeningOn: '2018-30-12 08:00:00',
            tags: [],
          };
            chai.request(server)
            .get(`/api/v1/meetups/${meetup.id}`)
            .set('x-access-token', token)
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('id').eql(meetup.id);
              res.body.data[0].should.have.property('topic');
              res.body.data[0].should.have.property('location');
              res.body.data[0].should.have.property('happeningon');
              res.body.data[0].should.have.property('tags');
              done();
            });
  });
});
describe('/Create meetup rsvp', () => {

  it('it should not create a new rsvp without the response field', (done) => {
    chai.request(server)
    .post('/api/v1/meetups/1/rsvps')
    .set('x-access-token', token)
    .send({response: ""})
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.error.should.be.a('string');
      res.body.error.should.have.eql('All fields are required, you must provide a "response" field');
      done();
    });
  });



  it('it should not create a new rsvp if status value is not equal to YES NO or MAYBE', (done) => {
    chai.request(server)
    .post('/api/v1/meetups/1/rsvps')
    .set('x-access-token', token)
    .send({response: 'yesno'})
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.error.should.be.a('array');
      res.body.error[0].should.be.a('object');
      res.body.error[0].response.should.have.eql('Response expects only "yes", "no" and "maybe"');
      done();
    });
  });

  it('it should create a new rsvp for a meetup', (done) => {
    chai.request(server)
    .post('/api/v1/meetups/1/rsvps')
    .set('x-access-token', token)
    .send({response: 'yes'})
    .end((err, res) => {
      if(err) {
        return err;
      }
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.be.a('array');
      res.body.data[0].should.have.property('meetup');
      res.body.data[0].should.have.property('user');
      res.body.data[0].should.have.property('response');
      done();
    });
  });
});
describe('/GET upcoming meetups', () => {
  it('it should get upcoming all the meetups', (done) => {
    chai.request(server)
            .get('/api/v1/meetups/upcoming')
            .set('x-access-token', token)
            .end((err, res) => {
                  res.should.have.status(201);
                  expect(res.body.data).to.be.a('array');
              done();
          });
  });
});

describe('/* Any request not found on the server', () => {
  it('it should return a 404 error if request is not found on the server', (done) => {
    chai.request(server)
    .get('/api/v1/rrr')
    .end((err, res) => {
      res.should.have.status(404);
      res.body.should.be.a('object');
      res.body.error.should.be.a('string');
      res.body.error.should.have.eql('invalid resource');
      done();
    });
  });
});
import chai from 'chai';

import chaiHttp from 'chai-http';

import server from '../app';

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
  // it('it should not create a meetup without topic field', (done) => {
  //   const meetup = {
  //     location: 'Lagos',
  //     happeningOn: '2018-12-01 15:00:00',
  //     tags: [],
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].topic.should.have.eql('topic field is required');
  //       done();
  //     });
  // });

  // it('it should not create a meetup without location field', (done) => {
  //   const meetup = {
  //     topic: 'The Tech group',
  //     happeningOn: '2018-12-01 15:00:00',
  //     tags: [],
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].location.should.have.eql('location field is required');
  //       done();
  //     });
  // });

  // it('it should not create a meetup without happening on field', (done) => {
  //   const meetup = {
  //     topic: 'The Tech group',
  //     location: 'Ikeja, Lagos',
  //     tags: [],
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].happeningOn.should.have.eql('happeningOn field is required');
  //       done();
  //     });
  // });

  // it('it should not create a meetup without tags field', (done) => {
  //   const meetup = {
  //     topic: 'The Tech group',
  //     location: 'Ikeja, Lagos',
  //     happeningOn: '2018-12-08 15:00:00',
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].tags.should.have.eql('tags field is required');
  //       done();
  //     });
  // });

  // it('it should not create a meetup if topic characters is less than 5', (done) => {
  //   const meetup = {
  //     topic: 'The',
  //     location: 'Ikeja, Lagos',
  //     happeningOn: '2018-12-08 15:00:00',
  //     tags: [],
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].topic.should.have.eql('Topic should be more than 5 characters');
  //       done();
  //     });
  // });

  // it('it should not create a meetup if location characters is less than 5', (done) => {
  //   const meetup = {
  //     topic: 'The Tech Event',
  //     location: 'Ike',
  //     happeningOn: '2018-12-08 15:00:00',
  //     tags: [],
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].location.should.have.eql('Location should be more than 5 characters');
  //       done();
  //     });
  // });

  // it('it should not create a meetup if happening on is not a valid date', (done) => {
  //   const meetup = {
  //     topic: 'The Tech Event',
  //     location: 'Ikeja, Lagos',
  //     happeningOn: '2018 15:00:00',
  //     tags: [],
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].happeningOn.should.have.eql('HappeningOn should be a valid date time');
  //       done();
  //     });
  // });

  // it('it should not create a meetup if tags is not an array', (done) => {
  //   const meetup = {
  //     topic: 'The Tech Event',
  //     location: 'Ikeja, Lagos',
  //     happeningOn: '2018-01-11 15:00:00',
  //     tags: 'tech',
  //   };

  //   chai.request(server)
  //     .post('/api/v1/meetup')
  //     .send(meetup)
  //     .end((err, res) => {
  //       res.should.have.status(422);
  //       res.body.should.be.a('object');
  //       res.body.error.should.be.a('array');
  //       res.body.error[0].should.be.a('object');
  //       res.body.error[0].tags.should.have.eql('Tags should be an array');
  //       done();
  //     });
  // });

  it('it should create a new meetup', (done) => {
    const meetup = {
      topic: 'lolsdddd',
      location: 'Lagosyy',
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
describe('/Create meetup rsvp', () => {
  it('it should not create a new rsvp without the topic field', (done) => {
    const rsvp = {
      status: 'yes',
    };
    chai.request(server)
    .post('/api/v1/meetups/112/rsvps')
    .send(rsvp)
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.error.should.be.a('array');
      res.body.error[0].should.be.a('object');
      res.body.error[0].topic.should.have.eql('topic field is required');
      done();
    });
  });

  it('it should not create a new rsvp without the status field', (done) => {
    const rsvp = {
      topic: 'rsvp me and them',
    };
    chai.request(server)
    .post('/api/v1/meetups/112/rsvps')
    .send(rsvp)
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.error.should.be.a('array');
      res.body.error[0].should.be.a('object');
      res.body.error[0].status.should.have.eql('status field is required');
      done();
    });
  });

  it('it should not create a new rsvp if topic characters is less than 5', (done) => {
    const rsvp = {
      topic: 'rsv',
      status: 'yes',
    };
    chai.request(server)
    .post('/api/v1/meetups/112/rsvps')
    .send(rsvp)
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.error.should.be.a('array');
      res.body.error[0].should.be.a('object');
      res.body.error[0].topic.should.have.eql('Topic should be more than 5 characters');
      done();
    });
  });

  it('it should not create a new rsvp if status value is not equal to YES NO or MAYBE', (done) => {
    const rsvp = {
      topic: 'rsvp stuff',
      status: 'postpone',
    };
    chai.request(server)
    .post('/api/v1/meetups/112/rsvps')
    .send(rsvp)
    .end((err, res) => {
      res.should.have.status(422);
      res.body.should.be.a('object');
      res.body.error.should.be.a('array');
      res.body.error[0].should.be.a('object');
      res.body.error[0].status.should.have.eql('Status expects only "yes", "no" and "maybe"');
      done();
    });
  });

  it('it should create a new rsvp for a meetup', (done) => {
    const rsvp = {
      topic: 'lolsdddd',
      status: 'yes',
    };
    chai.request(server)
    .post('/api/v1/meetups/112/rsvps')
    .send(rsvp)
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.data.should.be.a('array');
      res.body.data[0].should.have.property('meetup');
      res.body.data[0].should.have.property('topic');
      res.body.data[0].should.have.property('status');
      done();
    });
  });
});
describe('/GET upcoming meetups', () => {
  it('it should get upcoming all the meetups', (done) => {
    chai.request(server)
            .get('/api/v1/meetups/upcoming')
            .end((err, res) => {
                  res.should.have.status(200);
                  expect(res.body.data).to.be.a('array');
              done();
          });
  });
});

// describe('/* Any request not found on the server', () => {
//   it('it should return a 404 error if request is not found on the server', (done) => {
//     chai.request(server)
//     .get('/api/v1/meetups/upcoaming')
//     .end((err, res) => {
//       res.should.have.status(404);
//       res.body.should.be.a('object');
//       res.body.error.should.be.a('string');
//       res.body.error.should.have.property('error');
//       done();
//     });
//   });
// });
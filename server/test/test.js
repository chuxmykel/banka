import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);

const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;

describe('Authentication Tests', () => {
  describe('User Sign Up Tests', () => {
    describe(`POST ${userEndPoint}signup`, () => {
      it('Should create a new user', (done) => {
        const user = {
          firstName: 'Chukwudi',
          lastName: 'Ngwobia',
          email: 'coolemail@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            done();
          });
      });

      it('Should return 400 if firstname is ommited', (done) => {
        const user = {
          lastname: 'Ngwobia',
          email: 'coolemail1@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if lastname is ommited', (done) => {
        const user = {
          firstname: 'Chukwudi',
          email: 'coolemail2@testmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if email is ommited', (done) => {
        const user = {
          firstname: 'Chukwudi',
          lastname: 'Ngwobia',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 422 if email already exists', (done) => {
        const user = {
          firstName: 'Chukwudi',
          lastName: 'Ngwobia',
          email: 'kenny_g@gmail.com',
          password: 'pA55w0rd',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });


      it('Should return 400 if password is ommited', (done) => {
        const user = {
          firstname: 'Chukwudi',
          lastname: 'Ngwobia',
          email: 'coolemail5@testmail.com',
        };
        chai.request(app)
          .post(`${userEndPoint}signup`)
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });

  describe('User Login tests', () => {
    describe(`POST ${userEndPoint}signin`, () => {
      it('Should login a user successfully', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
          password: 'password',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('token');
            done();
          });
      });

      it('Should deny access if wrong email is provided', (done) => {
        const login = {
          email: 'kcmykirl@gmail.com',
          password: 'password',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('Authentication Failed');
            done();
          });
      });

      it('Should deny access if wrong password is provided', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
          password: 'passweod',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            res.body.error.should.equal('Authentication Failed');
            done();
          });
      });

      it('Should return 400 if email is not provided', (done) => {
        const login = {
          password: 'password',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if password is ommited', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
        };
        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });
});

describe('Account Tests', () => {
  describe('Account Creation Tests', () => {
    describe(`POST ${apiEndPoint}accounts`, () => {
      it('Should create an account successfully', (done) => {
        const login = {
          email: 'kcmykairl@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
            const input = {
              type: 'current',
              initialDeposit: 50000.35,
            };
            chai.request(app)
              .post(`${apiEndPoint}accounts`)
              .set('Authorization', token)
              .send(input)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                done();
              });
          });
      });

      it('Should return 400 if account type isn\'t specified', (done) => {
        const input = {
          initialDeposit: 50000.00,
        };
        chai.request(app)
          .post(`${apiEndPoint}accounts`)
          .send(input)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if initial deposit isn\'t specified', (done) => {
        const input = {
          type: 'current',
        };
        chai.request(app)
          .post(`${apiEndPoint}accounts`)
          .send(input)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });

  describe('Account Status change Tests', () => {
    describe(`PATCH ${apiEndPoint}accounts/:accountNumber`, () => {
      it('Should edit account status successfully', (done) => {
        const login = {
          email: 'chukwudi.m@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;

            chai.request(app)
              .patch(`${apiEndPoint}accounts/5823642528`)
              .set('Authorization', token)
              .send({ status: 'dormant' })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('status');
                done();
              });
          });
      });

      it('Should return 400 if new account status isn\'t specified', (done) => {
        chai.request(app)
          .patch(`${apiEndPoint}accounts/5823642528`)
          .send({})
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });

      it('Should return 400 if wrong status details are provided', (done) => {
        chai.request(app)
          .patch(`${apiEndPoint}accounts/5823642528`)
          .send({ status: 'domant' })
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error');
            done();
          });
      });
    });
  });

  describe('Account Delete Tests', () => {
    describe(`DELETE ${apiEndPoint}accounts/:accountNumber`, () => {
      it('Should should delete an account successfully', (done) => {
        const login = {
          email: 'chukwudi.m@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
            const accountNumber = 7456321485;

            chai.request(app)
              .delete(`${apiEndPoint}accounts/${accountNumber}`)
              .set('Authorization', token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('message');
                done();
              });
          });
      });

      it('Should return 404 if account does not exist', (done) => {
        const login = {
          email: 'chukwudi.m@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data.token}`;
            const accountNumber = 7456321485;

            chai.request(app)
              .delete(`${apiEndPoint}accounts/${accountNumber}`)
              .set('Authorization', token)
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
  });
});

describe('Transaction Tests', () => {
  describe(`POST ${apiEndPoint}transactions/:accountNumber/credit`, () => {
    it('Should credit an account status successfully', (done) => {
      const login = {
        email: 'chukwudi.m@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data.token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/credit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('transactionId');
              res.body.data.should.have.property('cashier');
              res.body.data.should.have.property('transactionType');
              res.body.data.should.have.property('accountBalance');
              done();
            });
        });
    });

    it('Should return 400 if amount isn\'t specified', (done) => {
      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/credit`)
        .send({})
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });

    it('Should return 400 if non integer characters are provided', (done) => {
      chai.request(app)
        .patch(`${apiEndPoint}accounts/5823642528`)
        .send({ amount: 'do521' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
});

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.should();

chai.use(chaiHttp);

const apiEndPoint = '/api/v1/';
const userEndPoint = `${apiEndPoint}auth/`;
const randomToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZmlyc3RuYW1lIjoiQ2h1a3d1ZGkiLCJsYXN0bmFtZSI6Ik5nd29iaWEiLCJvdGhlcm5hbWUiOiJNaWtlIiwiZW1haWwiOiJuZ3dvYmlhY2h1a3d1ZGlAZ21haWwuY29tIiwicGhvbmVOdW1iZXIiOiIwNzA2MDg1NDc3MyIsInBhc3Nwb3J0VXJsIjoiaHR0cHM6Ly9nbWFpbC5jb20vcGFzc3BvcnQiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NTExNzYzMzYsImV4cCI6MTU1MTE3OTkzNn0.ewoovxp-otFQ58E2Ez7wWTfGyFwoeJX7CY_nBL6r06c';

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
            res.body.data.should.be.a('array');
            res.body.data[0].should.have.property('token');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('firstName');
            res.body.data[0].should.have.property('lastName');
            res.body.data[0].should.have.property('email');
            done();
          });
      });

      it('Should return 400 if firstname is ommited', (done) => {
        const user = {
          lastName: 'Ngwobia',
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
          firstName: 'Chukwudi',
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
          firstName: 'Chukwudi',
          lastName: 'Ngwobia',
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

      it('Should return 400 if email key is provided without value', (done) => {
        const user = {
          firstname: 'Chukwudi',
          lastname: 'Ngwobia',
          password: 'pA55w0rd',
          email: '',
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

      it('Should return 409 if email already exists', (done) => {
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
            res.should.have.status(409);
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
            res.body.data.should.be.a('array');
            res.body.data[0].should.have.property('token');
            res.body.data[0].should.have.property('id');
            res.body.data[0].should.have.property('firstName');
            res.body.data[0].should.have.property('lastName');
            res.body.data[0].should.have.property('email');
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
            res.body.error.should.equal('The email and password you entered did not match our records. Please double-check and try again.');
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
            res.body.error.should.equal('The email and password you entered did not match our records. Please double-check and try again.');
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

describe('Protected Routes Tests', () => {
  describe('POST requests to staff protected routes by users', () => {
    it('Should return 403 if token is for user and not staff', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/debit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
  describe('POST requests to user protected routes', () => {
    it('Should return 401 if user token is invalid', (done) => {
      const token = `Bearer ${randomToken}`;
      const input = {
        type: 'current',
        initialDeposit: 50000.35,
      };

      chai.request(app)
        .post(`${apiEndPoint}accounts`)
        .set('Authorization', token)
        .send(input)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  describe('POST requests to staff protected routes', () => {
    it('Should return 401 if staff token is invalid', (done) => {
      const token = `Bearer ${randomToken}`;

      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/credit`)
        .set('Authorization', token)
        .send({ amount: 2000 })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  describe('PATCH requests to admin protected routes', () => {
    it('Should return 401 if admin token is invalid', (done) => {
      const token = `Bearer ${randomToken}`;

      chai.request(app)
        .patch(`${apiEndPoint}accounts/5823642528`)
        .set('Authorization', token)
        .send({ status: 'dormant' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
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
            const token = `Bearer ${loginRes.body.data[0].token}`;
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
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('accountNumber');
                res.body.data[0].should.have.property('firstName');
                res.body.data[0].should.have.property('lastName');
                res.body.data[0].should.have.property('email');
                res.body.data[0].should.have.property('type');
                res.body.data[0].should.have.property('openingBalance');
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
          email: 'ngwobiachukwudi@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data[0].token}`;

            chai.request(app)
              .patch(`${apiEndPoint}accounts/5823642528`)
              .set('Authorization', token)
              .send({ status: 'dormant' })
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('data');
                res.body.data.should.be.a('array');
                res.body.data[0].should.have.property('accountNumber');
                res.body.data[0].should.have.property('status');
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

      it('Should return 404 if account does not exist', (done) => {
        const login = {
          email: 'ngwobiachukwudi@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data[0].token}`;
            const accountNumber = 6456321487;

            chai.request(app)
              .patch(`${apiEndPoint}accounts/${accountNumber}`)
              .set('Authorization', token)
              .send({ status: 'dormant' })
              .end((err, res) => {
                res.should.have.status(404);
                done();
              });
          });
      });
    });
  });

  describe('Account Delete Tests', () => {
    describe(`DELETE ${apiEndPoint}accounts/:accountNumber`, () => {
      it('Should should delete an account successfully', (done) => {
        const login = {
          email: 'ngwobiachukwudi@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data[0].token}`;
            const accountNumber = 1758964523;

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
          email: 'ngwobiachukwudi@gmail.com',
          password: 'password',
        };

        chai.request(app)
          .post(`${userEndPoint}signin`)
          .send(login)
          .end((loginErr, loginRes) => {
            const token = `Bearer ${loginRes.body.data[0].token}`;
            const accountNumber = 1758964523;

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
    it('Should credit an account successfully', (done) => {
      const login = {
        email: 'kenny_g@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/credit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('transactionId');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('cashier');
              res.body.data[0].should.have.property('transactionType');
              res.body.data[0].should.have.property('accountBalance');
              done();
            });
        });
    });
    it('Should return a 404 error if account number does not exist', (done) => {
      const login = {
        email: 'kenny_g@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5258525852/credit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
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
        .post(`${apiEndPoint}transactions/5823642528/credit`)
        .send({ amount: 'do521' })
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('error');
          done();
        });
    });
  });
  describe(`POST ${apiEndPoint}transactions/:accountNumber/debit`, () => {
    it('Should debit an account successfully', (done) => {
      const login = {
        email: 'kenny_g@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/debit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('transactionId');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('cashier');
              res.body.data[0].should.have.property('transactionType');
              res.body.data[0].should.have.property('accountBalance');
              done();
            });
        });
    });

    it('Should not debit an account beyond it\'s available funds', (done) => {
      const login = {
        email: 'kenny_g@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5823642528/debit`)
            .set('Authorization', token)
            .send({ amount: 20000000000 })
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    it('Should return a 404 error if account number does not exist', (done) => {
      const login = {
        email: 'kenny_g@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .post(`${apiEndPoint}transactions/5258525852/debit`)
            .set('Authorization', token)
            .send({ amount: 2000 })
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });

    it('Should return 400 if amount isn\'t specified', (done) => {
      chai.request(app)
        .post(`${apiEndPoint}transactions/5823642528/debit`)
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
        .post(`${apiEndPoint}transactions/5823642528/debit`)
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

describe('Transaction history Tests', () => {
  describe(`GET ${apiEndPoint}accounts/:accountNumber/transactions`, () => {
    it('Should fetch account transaction history successfully', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/3254125869/transactions`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('transactionId');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('oldBalance');
              res.body.data[0].should.have.property('newBalance');
              done();
            });
        });
    });
    it('Should return 404 and an error message if a non existing account is provided', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/2354125869/transactions`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    it('Should return 403 and an error message if user tries to access an account that is not his', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/8745521633/transactions`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
  describe(`GET ${apiEndPoint}transactions/:id`, () => {
    it('Should fetch a specific transaction information successfully', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}transactions/11`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('transactionId');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('amount');
              res.body.data[0].should.have.property('oldBalance');
              res.body.data[0].should.have.property('newBalance');
              done();
            });
        });
    });
    it('Should return 404 and an error message if an id not owned by the user is provided', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}transactions/9`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
});

describe('Account Details Tests', () => {
  describe(`GET ${apiEndPoint}accounts/:accountNumber`, () => {
    it('Should fetch account transaction history successfully', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/3254125869`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('owner');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('ownerEmail');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('status');
              res.body.data[0].should.have.property('balance');
              done();
            });
        });
    });
    it('Should return 404 and an error message if a non existing account is provided', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/2354125869`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
    it('Should return 403 and an error message if user tries to access an account that is not his', (done) => {
      const login = {
        email: 'kcmykairl@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/8745521633`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(403);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
});

describe('View All User\'s Accounts Tests', () => {
  describe(`GET ${apiEndPoint}user/:email/acccounts`, () => {
    it('Should fetch all user accounts successfully', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}user/kcmykairl@gmail.com/accounts`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('accounts');
              res.body.accounts.should.be.a('array');
              res.body.accounts[0].should.have.property('createdOn');
              res.body.accounts[0].should.have.property('accountNumber');
              res.body.accounts[0].should.have.property('type');
              res.body.accounts[0].should.have.property('status');
              res.body.accounts[0].should.have.property('balance');
              done();
            });
        });
    });
    it('Should return 404 and an error message if a non existing email is provided', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}user/nonexistingmail@test.com/accounts`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(404);
              res.body.should.be.a('object');
              res.body.should.have.property('error');
              done();
            });
        });
    });
  });
});

describe('View All Accounts Tests', () => {
  describe(`GET ${apiEndPoint}acccounts`, () => {
    it('Should fetch all accounts successfully', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('ownerEmail');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('status');
              res.body.data[0].should.have.property('balance');
              done();
            });
        });
    });
  });
  describe(`GET ${apiEndPoint}acccounts/?status=active`, () => {
    it('Should fetch all active accounts successfully', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/?status=active`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('ownerEmail');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('status');
              res.body.data[0].status.should.equal('active');
              res.body.data[0].should.have.property('balance');
              done();
            });
        });
    });
  });
  describe(`GET ${apiEndPoint}acccounts/?status=dormant`, () => {
    it('Should fetch all dormant accounts successfully', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/?status=dormant`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('ownerEmail');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('status');
              res.body.data[0].status.should.equal('dormant');
              res.body.data[0].should.have.property('balance');
              done();
            });
        });
    });
  });
  describe(`GET ${apiEndPoint}acccounts/?status=draft`, () => {
    it('Should fetch all draft accounts successfully', (done) => {
      const login = {
        email: 'ngwobiachukwudi@gmail.com',
        password: 'password',
      };

      chai.request(app)
        .post(`${userEndPoint}signin`)
        .send(login)
        .end((loginErr, loginRes) => {
          const token = `Bearer ${loginRes.body.data[0].token}`;

          chai.request(app)
            .get(`${apiEndPoint}accounts/?status=draft`)
            .set('Authorization', token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('data');
              res.body.data.should.be.a('array');
              res.body.data[0].should.have.property('createdOn');
              res.body.data[0].should.have.property('accountNumber');
              res.body.data[0].should.have.property('ownerEmail');
              res.body.data[0].should.have.property('type');
              res.body.data[0].should.have.property('status');
              res.body.data[0].status.should.equal('draft');
              res.body.data[0].should.have.property('balance');
              done();
            });
        });
    });
  });
});

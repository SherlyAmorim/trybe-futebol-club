import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Users from '../database/models/UsersSequelize';
import { login, noEmailLoginBody, noPasswordLoginBody, rash, token } from './mocks/Users.mocks';
import UsersValidations from '../middlewares/UsersValidations';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Users teste', function() {
  beforeEach(function () {sinon.restore(); });

  it('Post Users email Validations Middleware', async function () {
    sinon.stub(Users, 'findOne').resolves();
    sinon.stub(UsersValidations, 'validateLogin').returns();

    const result = await chai.request(app).post('/login').send(noEmailLoginBody);

    expect(result.status).to.equal(400);
    expect(result.body).to.deep.equal({ "message": "All fields must be filled" });
  })

  it('Post Users password Validations Middleware', async function () {
    sinon.stub(Users, 'findOne').resolves();
    sinon.stub(UsersValidations, 'validateLogin').returns();

    const result = await chai.request(app).post('/login').send(noPasswordLoginBody);

    expect(result.status).to.equal(400);
    expect(result.body).to.deep.equal({ "message": "All fields must be filled" });
  })

  it('Post Users Route', async function () {
    sinon.stub(Users, 'findOne').resolves(rash as any);
    sinon.stub(UsersValidations, 'validateLogin').returns();

    const { status } = await chai.request(app).post('/login').send(login);

    expect(status).to.equal(200);
  })
});

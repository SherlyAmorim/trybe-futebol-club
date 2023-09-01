import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Users from '../database/models/UsersSequelize';
import { login, noEmailLoginBody, noPasswordLoginBody, rash, token, validLoginBody } from './mocks/Users.mocks';
import UsersValidations from '../middlewares/UsersValidations';
import JWT from '../utils/JWT';

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
  
  it('Post Users Route with invalid email or password', async function () {
    sinon.stub(Users, 'findOne').resolves(null);
    sinon.stub(UsersValidations, 'validateLogin').returns();
    
    const resp = await chai.request(app).post('/login').send( { email: 'sherly@admin.com', password: 'secret_admin' });
    
    expect(resp.status).to.equal(401);
    expect(resp.body).to.deep.equal({ message: 'Invalid email or password' });
  })
  
  // it('Post Users Route with invalid email or password', async function () {
    //   sinon.stub(Users, 'findOne').resolves(validLoginBody[0] as any);
    
    //   const resp = await chai.request(app).post('/login').send( { email: 'sherly@admin.com', password: 'secret_admin' });
    
    //   expect(resp.status).to.equal(401);
    //   expect(resp.body).to.deep.equal({ message: 'Invalid email or password' });
    // })
    
  it('Post Users Route', async function () {
    sinon.stub(Users, 'findOne').resolves(rash as any);
    sinon.stub(UsersValidations, 'validateLogin').returns();

    const resp = await chai.request(app).post('/login').send(login);
    
    expect(resp.status).to.equal(200);
    expect(resp.body).to.have.key('token');
    expect(resp.body.token).to.be.a('string');
  })
});

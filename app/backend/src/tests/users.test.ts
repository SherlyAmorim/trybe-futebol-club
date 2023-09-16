import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Users from '../database/models/UsersSequelize';
import { invalidLoginBody, invalidateEmail, invalidatePassword, login, noEmailLoginBody, noPasswordLoginBody, rash, role } from './mocks/Users.mocks';
import UsersValidations from '../middlewares/UsersValidations';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Users teste', function() {
  beforeEach(function () {sinon.restore(); });

  it('Post Users Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });
    sinon.stub(Users, 'findOne').resolves(rash as any);
    sinon.stub(UsersValidations, 'validateLogin').returns();

    const resp = await chai.request(app).post('/login').send(login);
    
    expect(resp.status).to.equal(200);
    expect(resp.body).to.deep.equal({token: token});
    expect(resp.body).to.have.key('token');
    expect(resp.body.token).to.be.a('string');
  })

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
    
    const resp = await chai.request(app).post('/login').send(invalidLoginBody);
    
    expect(resp.status).to.equal(401);
    expect(resp.body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('Post Users return null', async function () {
    sinon.stub(Users, 'findOne').resolves();
    sinon.stub(UsersValidations, 'validateLogin').returns();
    
    const resp = await await chai.request(app).post('/login').send(invalidLoginBody);
    
    expect(resp.status).to.equal(401);
    expect(resp.body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('Get Users /Role Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });
    sinon.stub(Users, 'findOne').resolves(role as any);
    sinon.stub(UsersValidations, 'validateLogin').returns();
    
    const resp = await await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);
    
    expect(resp.status).to.equal(200);
    expect(resp.body).to.deep.equal(role);
  })

  it('Get Users /Role return null', async function () {
    const token = JWT.sign({ email: 'sherly@admin.com' });
    sinon.stub(Users, 'findOne').resolves();
    sinon.stub(UsersValidations, 'validateLogin').returns();
    
    const resp = await await chai.request(app).get('/login/role').set('Authorization', `Bearer ${token}`);
    
    expect(resp.status).to.equal(404);
    expect(resp.body).to.deep.equal({ message: 'User not found' });
  })

  it('Post Users return UNAUTHORIZED invalid email', async function () {
    sinon.stub(Users, 'findOne').resolves();
    sinon.stub(UsersValidations, 'validateLogin').returns();
    
    const resp = await await chai.request(app).post('/login').send(invalidateEmail);
    
    expect(resp.status).to.equal(401);
    expect(resp.body).to.deep.equal({ message: 'Invalid email or password' });
  })

  it('Post Users return UNAUTHORIZED invalid password', async function () {
    sinon.stub(Users, 'findOne').resolves();
    sinon.stub(UsersValidations, 'validateLogin').returns();
    
    const resp = await await chai.request(app).post('/login').send(invalidatePassword);
    
    expect(resp.status).to.equal(401);
    expect(resp.body).to.deep.equal({ message: 'Invalid email or password' });
  })
});

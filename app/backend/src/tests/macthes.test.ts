import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Matches from '../database/models/MatchesSequelize';
import { createInputMatch, createInputMatchNull, createOutputMatch, matchAll, matchFalse, matchTrue, matches, matchesMiddleware, matches_input_patch_id, token } from './mocks/Matches.mocks';
import JWT from '../utils/JWT';
import MatchesValidations from '../middlewares/MatchesValidation';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches teste', function() {
  beforeEach(function () {sinon.restore(); });

  it('Get Matches Route', async function () {
    sinon.stub(Matches, 'findAll').resolves(matches as any);

    const {status, body} = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  })

  it('Get Matches Route Error 500', async function () {
    const error = new Error('Internal Server Error');
    sinon.stub(Matches, 'findAll').throws(error);

    const res = await chai.request(app).get('/matches');
        
    expect(res).to.have.status(500);
  })
  
  it('Get Matches/inProgress=true Route', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchTrue as any);

    const {status, body} = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchTrue);
  })

  it('Get Matches/inProgress=false Route', async function () {
    sinon.stub(Matches, 'findAll').resolves(matchFalse as any);

    const {status, body} = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matchFalse);
  })

  it('Patch Matches/id Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'update').resolves(matchAll as any);  
    
    const response = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${token}`).send(matches_input_patch_id);    
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matches_input_patch_id);
  })

  it('Patch Matches/id Conflict Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'update').resolves([0]);  
    
    const response = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${token}`).send();    
    
    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({ message: 'Id not found or goals already updated' });
  })

  it('Patch Matches/id/finish Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'update').resolves({ inProgress: false } as any );
    
    const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${token}`).send();    
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  })

  it('Patch Matches/id/finish Conflict Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'update').resolves([0]);
    
    const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${token}`).send();    
    
    expect(response.status).to.equal(409);
    expect(response.body).to.deep.equal({ message: 'Id not found or match already finished' });
  })

  it('Post Matches/ Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'create').resolves(createOutputMatch as any );
    
    const response = await chai.request(app).post('/matches').set('Authorization', `Bearer ${token}`).send(createInputMatch);    
    
    expect(response.status).to.equal(201);
    expect(response.body).to.deep.equal(createOutputMatch);
  })

  it('Post Users return UNAUTHORIZED invalid token ', async function () {
    sinon.stub(Matches, 'create').resolves();
    sinon.stub(MatchesValidations, 'validateMatch').returns();
    
    const response = await chai.request(app).post('/matches').set('Authorization', `Bearer ${token}`).send(createInputMatch);
    
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token must be a valid token' });
  })

  it('Post Users return UNAUTHORIZED token Not Found', async function () {
    sinon.stub(Matches, 'create').resolves();
    sinon.stub(MatchesValidations, 'validateMatch').returns();
    
    const response = await chai.request(app).post('/matches').send(createInputMatch);
    
    expect(response.status).to.equal(401);
    expect(response.body).to.deep.equal({ message: 'Token not found' });
  })

  it('Post Matches/ Route return null', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'create').resolves();
    
    const response = await chai.request(app).post('/matches').set('Authorization', `Bearer ${token}`).send(createInputMatchNull);    
    
    expect(response.status).to.equal(404);
    expect(response.body).to.deep.equal({ message: 'There is no team with such id!' });
  })

  it('Post Matches/ Middleware validations', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'create').resolves();
    sinon.stub(MatchesValidations, 'validateMatch').returns();
    
    const response = await chai.request(app).post('/matches').set('Authorization', `Bearer ${token}`).send(matchesMiddleware);    
    
    expect(response.status).to.equal(422);
    expect(response.body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  })
});
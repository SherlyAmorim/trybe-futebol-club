import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Matches from '../database/models/MatchesSequelize';
import { match, matches, matches_input_patch_id } from './mocks/Matches.mocks';
import JWT from '../utils/JWT';
import { noPasswordLoginBody } from './mocks/Users.mocks';

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

  it('Get Teams Route Error 500', async function () {
    const error = new Error('Internal Server Error');
    sinon.stub(Matches, 'findAll').throws(error);

    const res = await chai.request(app).get('/matches');
        
    expect(res).to.have.status(500);
  })
  
  it('Patch Teams/id Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'update').resolves(match as any);  
    
    const response = await chai.request(app).patch('/matches/1').set('Authorization', `Bearer ${token}`).send(matches_input_patch_id);    
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(matches_input_patch_id);
  })

  it('Patch Teams/id/finish Route', async function () {
    const token = JWT.sign({ email: 'admin@admin.com' });  
    sinon.stub(Matches, 'update').resolves({ inProgress: false } as any );
    
    const response = await chai.request(app).patch('/matches/1/finish').set('Authorization', `Bearer ${token}`).send();    
    
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ message: 'Finished' });
  })
});
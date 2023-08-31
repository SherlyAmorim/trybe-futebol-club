import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Teams from '../database/models/TeamsSequelize';
import { team, teamNotFound, teams } from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams teste', function() {
  beforeEach(function () {sinon.restore(); });

  it('Get Teams Route', async function () {
    sinon.stub(Teams, 'findAll').resolves(teams as any);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  })

  it('Get Teams Route Error 500', async function () {
    const error = new Error('Internal Server Error');
    sinon.stub(Teams, 'findAll').throws(error);

    const res = await chai.request(app).get('/teams');
        
    expect(res).to.have.status(500);
  })
  
  it('Get Teams/id Route', async function () {
    sinon.stub(Teams, 'findByPk').resolves(team as any);
    
    const {status, body} = await chai.request(app).get('/teams/1');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  })

  it('Get Teams/id Not Found', async function () {
    sinon.stub(Teams, 'findByPk').resolves(teamNotFound[5] as any);
        
    const res = await chai.request(app).get('/teams/5');
    
    expect(res.status).to.equal(404);
  })
  
  it('Get Teams/id Route Error 500', async function () {
    const error = new Error('Internal Server Error');
    sinon.stub(Teams, 'findByPk').throws(error);

    const res = await chai.request(app).get('/teams/1');
        
    expect(res).to.have.status(500);
  })
});


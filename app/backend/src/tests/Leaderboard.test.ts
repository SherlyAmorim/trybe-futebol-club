import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Teams from '../database/models/TeamsSequelize';
import { InputMatch, allLeaderboard, awayLeaderboard, homeLeaderboard, outputModelBeforeTreatment } from './mocks/Leaderboard.mocks';
import LeaderboardService from '../service/Leaderboard.service';
import Matches from '../database/models/MatchesSequelize';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Leaderboard teste', function() {
  beforeEach(function () {sinon.restore(); });
  
  it('Get Leaderboard/home Route', async function () {
    const returnBD = homeLeaderboard.map((match) => {
      Teams.build({
        teamName: match.name,
      }, {
        include: [
          { model: Matches, as: 'homeMatch', where: { inProgress: false } },
        ]
      })
    });
        
    sinon.stub(Teams, 'findAll').resolves(returnBD as any); 
    sinon.stub(LeaderboardService.prototype, 'getTeamsHome').resolves({ status: 'SUCCESSFUL', data: homeLeaderboard });
    
    const {status, body} = await chai.request(app).get('/leaderboard/home');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(homeLeaderboard);
  })

  it('Get Leaderboard/away Route', async function () {
    const returnBD = awayLeaderboard.map((match) => {
      Teams.build({
        teamName: match.name,
      }, {
        include: [
          { model: Matches, as: 'awayMatch', where: { inProgress: false } },
        ]
      })
    });
        
    sinon.stub(Teams, 'findAll').resolves(returnBD as any); 
    sinon.stub(LeaderboardService.prototype, 'getTeamsAway').resolves({ status: 'SUCCESSFUL', data: awayLeaderboard });
    
    const {status, body} = await chai.request(app).get('/leaderboard/away');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(awayLeaderboard);
  })

  it('Get Leaderboard AllTeams Route', async function () {
    const returnBD = allLeaderboard.map((match) => {
      Teams.build({
        teamName: match.name,
      }, {
        include: [
          { model: Matches, as: 'homeMatch', where: { inProgress: false } },
          { model: Matches, as: 'awayMatch', where: { inProgress: false } },
        ]
      })
    });
        
    sinon.stub(Teams, 'findAll').resolves(returnBD as any); 
    sinon.stub(LeaderboardService.prototype, 'getAllTeams').resolves({ status: 'SUCCESSFUL', data: allLeaderboard });
    
    const {status, body} = await chai.request(app).get('/leaderboard');
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(allLeaderboard);
  });

  it('Get Leaderboard/home Route - return of the model before treatment', async function () {      
    sinon.stub(Teams, 'findAll').resolves(InputMatch as any); 
    
    const resp = await chai.request(app).get('/leaderboard/home');
    
    expect(resp.status).to.equal(200);
    expect(resp.body).to.deep.equal(outputModelBeforeTreatment);
  });

  it('Get Leaderboard/away Route - return of the model before treatment', async function () {      
    sinon.stub(Teams, 'findAll').resolves(InputMatch as any); 
    
    const resp = await chai.request(app).get('/leaderboard/away');
    
    expect(resp.status).to.equal(200);
    expect(resp.body).to.deep.equal(outputModelBeforeTreatment);
  });

  it('Get Leaderboard Route - return of the model before treatment', async function () {      
    sinon.stub(Teams, 'findAll').resolves(InputMatch as any); 
    
    const resp = await chai.request(app).get('/leaderboard');
    
    expect(resp.status).to.equal(200);
    expect(resp.body).to.deep.equal(outputModelBeforeTreatment);
  });
})

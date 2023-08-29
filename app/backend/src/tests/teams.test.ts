import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Teams from '../database/models/TeamsSequelize';
import { teams } from './mocks/Teams.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams teste', function() {
  it('Get Teams Route', async function () {
    sinon.stub(Teams, 'findAll').resolves(teams as any);

    const {status, body} = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  })
});

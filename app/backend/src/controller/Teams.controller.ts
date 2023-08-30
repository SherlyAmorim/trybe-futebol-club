import { Request, Response } from 'express';
import TeamsService from '../service/Teams.service';
import mapStatus from '../utils/mapStatus';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceData = await this.teamsService.getAllTeams();
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }

  public async getTeamById(req: Request, res: Response) {
    const serviceData = await this.teamsService.getTeamById(Number(req.params.id));
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }
}

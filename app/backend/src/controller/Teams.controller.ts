import { Request, Response } from 'express';
import TeamsService from '../service/Teams.service';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamsService.getAllTeams();
    return res.status(200).json(serviceResponse.data);
  }
}

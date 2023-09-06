import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(_req: Request, res: Response) {
    const serviceData = await this.matchesService.getAllTeams();
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }
}

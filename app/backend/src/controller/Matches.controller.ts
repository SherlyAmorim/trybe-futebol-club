import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceData = await this.matchesService.getAllTeams(inProgress as string);
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }
}

import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import MatchesService from '../service/Matches.service';
import { IMatche } from '../Interfaces/Matches/IMatche';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    const serviceData = await this.matchesService.getAllTeams(inProgress as string);
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }

  public async updateMatchesEnding(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const serviceData = await this.matchesService.updateMatchesEnding(Number(id));
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }

  public async updateMatchesInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const serviceData = await this.matchesService.updateMatchesInProgress(
      Number(id),
      { homeTeamGoals, awayTeamGoals } as IMatche,
    );
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }
}

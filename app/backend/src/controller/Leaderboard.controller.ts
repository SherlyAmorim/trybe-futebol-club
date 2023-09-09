import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import LeaderboardService from '../service/Leaderboard.service';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getTeamsHome(req: Request, res: Response): Promise<Response> {
    const serviceData = await this.leaderboardService.getTeamsHome();
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }
}

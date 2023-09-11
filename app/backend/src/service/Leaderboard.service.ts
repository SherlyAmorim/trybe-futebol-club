import { ILeaderboard } from '../Interfaces/Leaderboards/ILeaderboard';
import { IMatchesTeams } from '../Interfaces/Leaderboards/IMatchesTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/Leaderboard.model';
import GamesStatistics from '../utils/GamesStatistics';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async getTeamsHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const modelData = await this.leaderboardModel.getTeamsHome();

    const teamData: IMatchesTeams[] = modelData.map((team) => ({
      teamName: team.teamName,
      homeMatch: team.homeMatch ? [...team.homeMatch] : [],
    }));

    const dataFinal = GamesStatistics.calculateMatchesHome(teamData);

    const sortedData = GamesStatistics.orderClassific(dataFinal);

    return { status: 'SUCCESSFUL', data: sortedData };
  }
}

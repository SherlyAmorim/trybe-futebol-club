import { ILeaderboard } from '../Interfaces/Leaderboards/ILeaderboard';
import { IMatchesAway, IMatchesHome } from '../Interfaces/Leaderboards/IMatchesTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/Leaderboard.model';
import GamesStatistics from '../utils/GamesStatistics';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  public async getTeamsHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const modelData = await this.leaderboardModel.getTeamsHome();

    const teamData: IMatchesHome[] = modelData.map((team) => ({
      teamName: team.teamName,
      homeMatch: team.homeMatch ? [...team.homeMatch] : [],
    }));

    const dataFinal = GamesStatistics.calculateMatchesHome(teamData);

    const sortedData = GamesStatistics.orderClassific(dataFinal);

    return { status: 'SUCCESSFUL', data: sortedData };
  }

  public async getTeamsAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const modelData = await this.leaderboardModel.getTeamsAway();

    const teamData: IMatchesAway[] = modelData.map((team) => ({
      teamName: team.teamName,
      awayMatch: team.awayMatch ? [...team.awayMatch] : [],
    }));

    const dataFinal = GamesStatistics.calculateMatchesAway(teamData);

    const sortedData = GamesStatistics.orderClassific(dataFinal);

    return { status: 'SUCCESSFUL', data: sortedData };
  }

  public async getAllTeams(): Promise<ServiceResponse<ILeaderboard[]>> {
    const modelData = await this.leaderboardModel.getAllTeams();

    const teamHomeData: IMatchesHome[] = modelData.map((team) => ({
      teamName: team.teamName,
      homeMatch: team.homeMatch ? [...team.homeMatch] : [],
    }));

    const teamAwayData: IMatchesAway[] = modelData.map((team) => ({
      teamName: team.teamName,
      awayMatch: team.awayMatch ? [...team.awayMatch] : [],
    }));

    const dataFinal = GamesStatistics.calculateMatchesAll(teamHomeData, teamAwayData);

    const sortedData = GamesStatistics.orderClassific(dataFinal);

    return { status: 'SUCCESSFUL', data: sortedData };
  }
}

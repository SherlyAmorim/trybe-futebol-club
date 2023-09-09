import { ILeaderboard } from '../Interfaces/Leaderboards/ILeaderboard';
import { IMatchesTeams } from '../Interfaces/Leaderboards/IMatchesTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import LeaderboardModel from '../models/Leaderboard.model';

export default class LeaderboardService {
  constructor(
    private leaderboardModel = new LeaderboardModel(),
  ) { }

  static learderboard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  };

  static calculateAll(data: IMatchesTeams[]): ILeaderboard[] {
    const calculateArray: ILeaderboard[] = data.map((dataItem) => {
      const calc = { ...LeaderboardService.learderboard };
      calc.name = dataItem.teamName;
      calc.totalGames = dataItem.homeMatch.length;
      calc.totalVictories = dataItem.homeMatch
        .filter((match) => match.homeTeamGoals > match.awayTeamGoals).length;
      calc.totalDraws = dataItem.homeMatch
        .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;
      calc.totalLosses = calc.totalGames - calc.totalVictories - calc.totalDraws;
      calc.goalsFavor = dataItem.homeMatch.reduce((total, match) => total + match.homeTeamGoals, 0);
      calc.goalsOwn = dataItem.homeMatch.reduce((total, match) => total + match.awayTeamGoals, 0);
      calc.totalPoints = calc.totalVictories * 3 + calc.totalDraws;
      calc.goalsBalance = calc.goalsFavor - calc.goalsOwn;
      calc.efficiency = calc.totalGames
        ? (calc.totalPoints / (calc.totalGames * 3)) * 100 : 0;

      return calc;
    });

    return calculateArray;
  }

  public async getTeamsHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const modelData = await this.leaderboardModel.getTeamsHome();

    const teamData: IMatchesTeams[] = modelData.map((team) => ({
      teamName: team.teamName,
      homeMatch: [],
    }));

    const dataFinal = LeaderboardService.calculateAll(teamData);
    return { status: 'SUCCESSFUL', data: dataFinal };
  }
}

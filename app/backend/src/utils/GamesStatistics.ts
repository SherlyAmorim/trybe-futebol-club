import { ILeaderboard } from '../Interfaces/Leaderboards/ILeaderboard';
import { IMatchesAway, IMatchesHome } from '../Interfaces/Leaderboards/IMatchesTeams';

export default class GamesStatistics {
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

  static calculateMatchesHome(datas: IMatchesHome[]): ILeaderboard[] {
    const calculateArray: ILeaderboard[] = datas.map((data) => {
      const c = { ...GamesStatistics.learderboard };
      if (data.homeMatch) {
        c.name = data.teamName;
        c.totalGames = data.homeMatch.length;
        c.totalVictories = data.homeMatch.filter((m) => m.homeTeamGoals > m.awayTeamGoals).length;
        c.totalDraws = data.homeMatch.filter((m) => m.homeTeamGoals === m.awayTeamGoals).length;
        c.totalLosses = c.totalGames - c.totalVictories - c.totalDraws;
        c.goalsFavor = data.homeMatch.reduce((t, m) => t + m.homeTeamGoals, 0);
        c.goalsOwn = data.homeMatch.reduce((t, m) => t + m.awayTeamGoals, 0);
        c.totalPoints = c.totalVictories * 3 + c.totalDraws;
        c.goalsBalance = c.goalsFavor - c.goalsOwn;
        c.efficiency = Number((c.totalGames ? (c.totalPoints / (c.totalGames * 3)) * 100 : 0)
          .toFixed(2));
      }
      return c;
    });
    return calculateArray;
  }

  static calculateMatchesAway(datas: IMatchesAway[]): ILeaderboard[] {
    const calculateArray: ILeaderboard[] = datas.map((data) => {
      const c = { ...GamesStatistics.learderboard };
      if (data.awayMatch) {
        c.name = data.teamName;
        c.totalGames = data.awayMatch.length;
        c.totalVictories = data.awayMatch.filter((m) => m.awayTeamGoals > m.homeTeamGoals).length;
        c.totalDraws = data.awayMatch.filter((m) => m.awayTeamGoals === m.homeTeamGoals).length;
        c.totalLosses = c.totalGames - c.totalVictories - c.totalDraws;
        c.goalsFavor = data.awayMatch.reduce((t, m) => t + m.awayTeamGoals, 0);
        c.goalsOwn = data.awayMatch.reduce((t, m) => t + m.homeTeamGoals, 0);
        c.totalPoints = c.totalVictories * 3 + c.totalDraws;
        c.goalsBalance = c.goalsFavor - c.goalsOwn;
        c.efficiency = Number((c.totalGames ? (c.totalPoints / (c.totalGames * 3)) * 100 : 0)
          .toFixed(2));
      }
      return c;
    });
    return calculateArray;
  }

  static calculateMatchesAll(hData: IMatchesHome[], aData: IMatchesAway[]): ILeaderboard[] {
    const hResult = GamesStatistics.calculateMatchesHome(hData);
    const aResult = GamesStatistics.calculateMatchesAway(aData);

    const combResult: ILeaderboard[] = [];

    for (let i = 0; i < hResult.length; i += 1) {
      const combEntry: ILeaderboard = { ...hResult[i] };

      combEntry.totalGames += aResult[i].totalGames;
      combEntry.totalVictories += aResult[i].totalVictories;
      combEntry.totalDraws += aResult[i].totalDraws;
      combEntry.totalLosses += aResult[i].totalLosses;
      combEntry.goalsFavor += aResult[i].goalsFavor;
      combEntry.goalsOwn += aResult[i].goalsOwn;
      combEntry.totalPoints += aResult[i].totalPoints;
      combEntry.goalsBalance += aResult[i].goalsBalance;
      combEntry.efficiency = Number(((combEntry.totalGames ? combEntry.totalPoints
        / (combEntry.totalGames * 3) : 0) * 100).toFixed(2));

      combResult.push(combEntry);
    }

    return combResult;
  }

  static orderClassific(allMatches: ILeaderboard[]): ILeaderboard[] {
    if (!allMatches || allMatches.length === 0) return [];

    const sortClassific = [...allMatches];

    sortClassific.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;

      const goalDifferA = a.goalsFavor - a.goalsOwn;
      const goalDifferB = b.goalsFavor - b.goalsOwn;
      if (goalDifferA !== goalDifferB) return goalDifferB - goalDifferA;

      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;

      return 0;
    });

    return sortClassific;
  }
}

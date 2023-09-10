import Teams from '../database/models/TeamsSequelize';
import { ILeaderboardModel } from '../Interfaces/Leaderboards/ILeaderboardModel';
import Matches from '../database/models/MatchesSequelize';
import { IMatchesTeams } from '../Interfaces/Leaderboards/IMatchesTeams';

export default class LeaderboardModel implements ILeaderboardModel {
  private teams = Teams;

  async getTeamsHome(): Promise<IMatchesTeams[]> {
    const dbMatches = await this.teams.findAll({
      attributes: ['teamName'],
      include: [
        { model: Matches, as: 'homeMatch', where: { inProgress: false } },
      ] });
    return dbMatches;
  }
}

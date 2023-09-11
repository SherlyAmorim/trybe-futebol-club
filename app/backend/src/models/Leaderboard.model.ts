import Teams from '../database/models/TeamsSequelize';
import { ILeaderboardModel } from '../Interfaces/Leaderboards/ILeaderboardModel';
import Matches from '../database/models/MatchesSequelize';
import { IMatchesAway, IMatchesHome } from '../Interfaces/Leaderboards/IMatchesTeams';

export default class LeaderboardModel implements ILeaderboardModel {
  private teams = Teams;

  async getTeamsHome(): Promise<IMatchesHome[]> {
    const dbMatches = await this.teams.findAll({
      attributes: ['teamName'],
      include: [
        { model: Matches, as: 'homeMatch', where: { inProgress: false } },
      ] });
    return dbMatches;
  }

  async getTeamsAway(): Promise<IMatchesAway[]> {
    const dbMatches = await this.teams.findAll({
      attributes: ['teamName'],
      include: [
        { model: Matches, as: 'awayMatch', where: { inProgress: false } },
      ] });
    return dbMatches;
  }
}

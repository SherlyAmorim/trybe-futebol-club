import { ITeam } from '../Teams/ITeam';

export interface ILeaderboardModel {
  getTeamsHome(): Promise<ITeam[] | void>,
}

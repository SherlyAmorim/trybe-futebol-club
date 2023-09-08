import { IMatche } from './IMatche';

export interface IMatcheModel {
  getAllTeams(): Promise<IMatche[]>,
  getTeamsInProgress(inProgress: IMatche['inProgress']): Promise<IMatche[]>,
  updateMatchesEnding(id: IMatche['id']): Promise<number>,
}

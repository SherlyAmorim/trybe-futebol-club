import { IMatche } from './IMatche';

export interface IMatcheModel {
  getAllTeams(): Promise<IMatche[]>,
  getTeamsInProgress(inProgress: IMatche['inProgress']): Promise<IMatche[]>,
}

import { IMatche } from './IMatche';

export interface IMatcheModel {
  getAllTeams(): Promise<IMatche[]>,
  getTeamsInProgress(inProgress: IMatche['inProgress']): Promise<IMatche[]>,
  updateMatchesEnding(id: IMatche['id']): Promise<number>,
  updateMatchesInProgress(id: IMatche['id'], data: IMatche): Promise<number>,
  createMatches(data: IMatche): Promise<IMatche>,
}

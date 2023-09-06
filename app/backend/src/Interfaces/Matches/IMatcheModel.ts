import { IMatche } from './IMatche';

export interface IMatcheModel {
  getAllTeams(): Promise<IMatche[]>
}

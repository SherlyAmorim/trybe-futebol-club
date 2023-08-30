import { ITeam } from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findOne(id: ITeam['id']): Promise<ITeam | null>
}

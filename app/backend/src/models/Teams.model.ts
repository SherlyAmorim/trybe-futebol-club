import { ITeam } from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import TeamsSequelize from '../database/models/TeamsSequelize';

export default class TeamsModel implements ITeamModel {
  private model = TeamsSequelize;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }
}

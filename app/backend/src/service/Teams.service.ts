import TeamsModel from '../models/Teams.model';
import { ITeam } from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    try {
      const modelData = await this.teamsModel.findAll();
      return { status: 'SUCCESSFUL', data: modelData };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: (error as Error).message } };
    }
  }

  public async getTeamById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    try {
      const modelData = await this.teamsModel.findOne(id);
      if (!modelData) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
      return { status: 'SUCCESSFUL', data: modelData };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: (error as Error).message } };
    }
  }
}

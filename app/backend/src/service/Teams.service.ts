import TeamsModel from '../models/Teams.model';
import { ITeam } from '../Interfaces/Teams/ITeam';
import { ITeamModel } from '../Interfaces/Teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamModel = new TeamsModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const modelData = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: modelData };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeam>> {
    const modelData = await this.teamsModel.findOne(id);
    if (!modelData) return { status: 'NOT_FOUND', data: { message: `Team ${id} not found` } };
    return { status: 'SUCCESSFUL', data: modelData };
  }
}

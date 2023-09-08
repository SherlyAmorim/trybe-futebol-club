import { IMatche } from '../Interfaces/Matches/IMatche';
import { IMatcheModel } from '../Interfaces/Matches/IMatcheModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/Matches.model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatcheModel = new MatchesModel(),
  ) { }

  public async getAllTeams(inProgress: string): Promise<ServiceResponse<IMatche[]>> {
    try {
      let modelData;

      if (inProgress === 'true') {
        modelData = await this.matchesModel.getTeamsInProgress(true);
      } else if (inProgress === 'false') {
        modelData = await this.matchesModel.getTeamsInProgress(false);
      } else {
        modelData = await this.matchesModel.getAllTeams();
      }
      return { status: 'SUCCESSFUL', data: modelData };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: (error as Error).message } };
    }
  }

  public async updateMatchesEnding(id: IMatche['id']): Promise<ServiceResponse<ServiceMessage>> {
    const modelData = await this.matchesModel.updateMatchesEnding(id);
    if (modelData === 0) {
      return { status: 'CONFLICT', data: { message: 'Id not found or match already finished' } };
    }
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async updateMatchesInProgress(id: IMatche['id'], data: IMatche)
    : Promise<ServiceResponse<IMatche>> {
    const modelData = await this.matchesModel.updateMatchesInProgress(id, data);
    if (modelData === 0) {
      return { status: 'CONFLICT', data: { message: 'Id not found or goals already updated' } };
    }
    return { status: 'SUCCESSFUL', data };
  }
}

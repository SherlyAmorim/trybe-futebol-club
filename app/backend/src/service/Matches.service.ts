import { IMatche } from '../Interfaces/Matches/IMatche';
import { IMatcheModel } from '../Interfaces/Matches/IMatcheModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/Matches.model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatcheModel = new MatchesModel(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponse<IMatche[]>> {
    try {
      const modelData = await this.matchesModel.getAllTeams();
      return { status: 'SUCCESSFUL', data: modelData };
    } catch (error) {
      return { status: 'INTERNAL_SERVER_ERROR', data: { message: (error as Error).message } };
    }
  }
}

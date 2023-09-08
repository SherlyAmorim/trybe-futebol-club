import { IMatche } from '../Interfaces/Matches/IMatche';
import { IMatcheModel } from '../Interfaces/Matches/IMatcheModel';
import MatchesSequelize from '../database/models/MatchesSequelize';
import Teams from '../database/models/TeamsSequelize';

export default class MatchesModel implements IMatcheModel {
  private model = MatchesSequelize;

  async getAllTeams(): Promise<IMatche[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async getTeamsInProgress(inProgress: IMatche['inProgress']): Promise<IMatche[]> {
    const dbData = await this.model.findAll({
      where: { inProgress },
      include: [
        { model: Teams, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return dbData;
  }

  async updateMatchesEnding(id: IMatche['id']): Promise<number> {
    const dbData = await this.model.update({ inProgress: false }, { where: { id } });
    return dbData[0];
  }
}

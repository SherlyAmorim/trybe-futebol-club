import { IMatche } from '../Interfaces/Matches/IMatche';
import { IMatcheModel } from '../Interfaces/Matches/IMatcheModel';
import MatchesSequelize from '../database/models/MatchesSequelize';
import Teams from '../database/models/TeamsSequelize';

export default class MatchesModel implements IMatcheModel {
  private model = MatchesSequelize;
  private teams = Teams;

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

  async updateMatchesInProgress(id: IMatche['id'], data: IMatche): Promise<number> {
    const dbData = await this.model.update(
      { homeTeamGoals: data.homeTeamGoals, awayTeamGoals: data.awayTeamGoals },
      { where: { id } },
    );
    return dbData[0];
  }

  async verifyIdsTeams(homeTeamId: IMatche['homeTeamId'], awayTeamId: IMatche['awayTeamId'])
    : Promise<object | null> {
    const dbDataHome = await this.teams.findByPk(homeTeamId);
    const dbDataAway = await this.teams.findByPk(awayTeamId);
    if (dbDataHome && dbDataAway) return { homeTeamId: dbDataHome.id, awayTeamId: dbDataAway.id };
    return null;
  }

  async createMatches(data: IMatche): Promise<IMatche> {
    const dbData = await this.model.create({
      homeTeamId: data.homeTeamId,
      homeTeamGoals: data.homeTeamGoals,
      awayTeamId: data.awayTeamId,
      awayTeamGoals: data.awayTeamGoals,
      inProgress: true,
    });
    return dbData;
  }
}

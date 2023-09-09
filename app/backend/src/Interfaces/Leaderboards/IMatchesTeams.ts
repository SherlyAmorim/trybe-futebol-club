import { IMatche } from '../Matches/IMatche';
import { ITeam } from '../Teams/ITeam';

export interface IMatchesTeams extends ITeam {
  homeMatch: IMatche[],
}

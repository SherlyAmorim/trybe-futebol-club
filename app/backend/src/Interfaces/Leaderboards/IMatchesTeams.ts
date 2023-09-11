import { IMatche } from '../Matches/IMatche';
import { ITeam } from '../Teams/ITeam';

export interface IMatchesHome extends ITeam {
  homeMatch?: IMatche[],
}

export interface IMatchesAway extends ITeam {
  awayMatch?: IMatche[],
}

export interface IMatchesAll extends ITeam {
  homeMatch?: IMatche[],
  awayMatch?: IMatche[],
}

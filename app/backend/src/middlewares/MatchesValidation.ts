import { NextFunction, Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';

export default class MatchesValidations {
  static validateMatch(req: Request, res: Response, next: NextFunction): Response | void {
    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      return res.status(mapStatus('UNPROCESSABLE'))
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  }
}

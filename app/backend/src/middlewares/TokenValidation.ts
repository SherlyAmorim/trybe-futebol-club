import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import mapStatus from '../utils/mapStatus';
import JWT from '../utils/JWT';

export default class TokenValidation {
  static extractToken(bearerToken: string): string {
    return bearerToken.split(' ')[1] || bearerToken;
  }

  static validateToken(req: Request, res: Response, next: NextFunction)
    : Response | void {
    const bearerToken = req.header('Authorization');
    const token = TokenValidation.extractToken(String(bearerToken));

    if (!bearerToken) {
      return res.status(mapStatus('UNAUTHORIZED'))
        .json({ message: 'Token not found' });
    }

    const validToken = JWT.verify(token) as JwtPayload;
    if (validToken.message === 'Token must be a valid token') {
      return res.status(mapStatus('UNAUTHORIZED')).json(validToken);
    }

    req.body.email = validToken.email;

    next();
  }
}

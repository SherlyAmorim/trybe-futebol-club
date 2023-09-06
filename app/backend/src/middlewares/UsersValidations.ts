import { NextFunction, Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';

export default class UsersValidations {
  static validateLogin(req:Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(mapStatus('INVALID_DATA')).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(mapStatus('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(mapStatus('UNAUTHORIZED')).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

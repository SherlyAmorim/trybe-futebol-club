import { Request, Response } from 'express';
import mapStatus from '../utils/mapStatus';
import UsersService from '../service/Users.service';

export default class UsersController {
  constructor(
    private usersService = new UsersService(),
  ) { }

  public async loginUser(req: Request, res: Response) {
    const serviceData = await this.usersService.loginUser(req.body);
    return res.status(mapStatus(serviceData.status)).json(serviceData.data);
  }
}

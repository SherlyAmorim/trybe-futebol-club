import * as bcrypt from 'bcryptjs';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import { IToken } from '../Interfaces/Users/IToken';
import { ILogin } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import UsersModel from '../models/Users.model';
import JWT from '../utils/JWT';

export default class UsersService {
  constructor(
    private usersModel: IUserModel = new UsersModel(),
  ) { }

  public async loginUser(data: ILogin): Promise<ServiceResponse<IToken | ServiceMessage>> {
    const modelData = await this.usersModel.loginUser(data.email);
    if (!modelData || !bcrypt.compareSync(data.password, modelData.password)) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Invalid email or password' },
      };
    }
    const token = JWT.sign({ email: data.email });
    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async getRole(email: string)
    : Promise<ServiceResponse<object | null>> {
    const modelData = await this.usersModel.getRole(email);
    return { status: 'SUCCESSFUL', data: { role: modelData } };
  }
}

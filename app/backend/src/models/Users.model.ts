import { IUser } from '../Interfaces/Users/IUser';
import { IUserModel } from '../Interfaces/Users/IUserModel';
import UsersSequelize from '../database/models/UsersSequelize';

export default class UsersModel implements IUserModel {
  private model = UsersSequelize;

  async loginUser(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) return null;
    const { id, username, password } = dbData;
    return { id, username, password, email };
  }
}

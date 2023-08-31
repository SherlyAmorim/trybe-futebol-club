import { IUser } from './IUser';

export interface IUserModel {
  loginUser(email: string): Promise<IUser | null>
}

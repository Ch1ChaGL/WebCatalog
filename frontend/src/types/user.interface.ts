import { ISocialNetwork } from './socialNetwork.interface';

export interface IUser {
  userId: number;
  nickname: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  banned: boolean;
  banReason: string | null;
  roles: string[];
  socialNetwork: ISocialNetwork[];
}

export interface IUserUpdate {
  userId: number;
  nickname?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  banned?: boolean;
  banReason?: string | null;
  roles?: string[];
  socialNetwork?: ISocialNetwork[];
}

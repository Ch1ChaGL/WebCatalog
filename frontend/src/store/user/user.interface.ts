import { IUser } from '@/types/user.interface';

export interface IUserState extends IUser {}

export interface IToken {
  accessToken: string;
}

export interface IInitialState {
  user: IUserState | null;
  isLoading: boolean;
  error: string | null;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegisterData {
  firstName?: string;
  lastName?: string;

  nickname: string;
  email: string;
  password: string;
  roles: string[];
}

export interface IAuthResponse extends IToken {
  user: IUser;
}

export interface IUserUpdate {
  userId: number;
  nickname?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  banned?: boolean;
  password?: string;
}

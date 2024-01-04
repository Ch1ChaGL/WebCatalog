export interface IUser {
  userId: number;
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  banned: boolean;
  banReason: string;
  roles: string[];
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  createdAt: Date;
  updatedAt: Date;
}

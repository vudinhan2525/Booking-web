export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string | null;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

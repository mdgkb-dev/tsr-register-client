import IUser from '@/interfaces/users/IUser';

export default interface IModelInfo {
  createdAt?: Date;
  updatedAt?: Date;

  createdById?: string;
  updatedById?: string;

  createdBy?: IUser;
  updatedBy?: IUser;
}

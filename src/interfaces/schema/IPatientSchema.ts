import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPatientSchema extends IBaseSchema {
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

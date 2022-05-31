import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPatientSchema extends IBaseSchema {
  fullName: string;
  humanId: string;
  isMale: string;
  dateBirth: string;
  createdAt: string;
  updatedAt: string;
}

import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IRepresentativeSchema extends IBaseSchema {
  fullName: string;
  isMale: string;
  createdAt: string;
  updatedAt: string;
}

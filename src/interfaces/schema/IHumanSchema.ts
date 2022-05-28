import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IHumanSchema extends IBaseSchema {
  tableName: string;
  dateBirth: string;
  isMale: string;
  fullName: string;
}

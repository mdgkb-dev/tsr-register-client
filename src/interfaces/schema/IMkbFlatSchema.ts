import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IMkbFlatSchema extends IBaseSchema {
  fullName: string;
  level: string;
}

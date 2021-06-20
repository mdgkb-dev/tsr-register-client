import ValueRelation from '@/interfaces/valueTypes/ValueRelation';

export default interface IValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation;
}

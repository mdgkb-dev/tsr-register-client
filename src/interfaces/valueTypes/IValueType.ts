import ValueRelation from '@/interfaces/valueTypes/ValueRelation';

export default interface IValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation;

  isString: () => boolean;
  isNumber: () => boolean;
  isDate: () => boolean;
  isRadio: () => boolean;
  isSet: () => boolean;
  isText: () => boolean;
  isBoolean: () => boolean;
  isFiles: () => boolean;
}

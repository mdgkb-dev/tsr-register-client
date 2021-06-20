import IValueType from '@/interfaces/valueTypes/IValueType';
import ValueRelation from '@/interfaces/valueTypes/ValueRelation';

export default class ValueType implements IValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation = ValueRelation.simple;

  constructor(valueType?: IValueType) {
    if (!valueType) {
      return;
    }
    this.id = valueType.id;
    this.name = valueType.name;
    this.valueRelation = valueType.valueRelation;
  }
}

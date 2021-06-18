import IValueType from '@/interfaces/valueTypes/IValueType';

export default class ValueType implements IValueType {
  id?: string;
  name?: string;

  constructor(valueType?: IValueType) {
    if (!valueType) {
      return;
    }
    this.id = valueType.id;
    this.name = valueType.name;
  }
}

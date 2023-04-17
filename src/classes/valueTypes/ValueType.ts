import ValueRelation from '@/interfaces/valueTypes/ValueRelation';
import ClassHelper from '@/services/ClassHelper';

export default class ValueType {
  id?: string;
  name?: string;
  valueRelation: ValueRelation = ValueRelation.simple;

  constructor(i?: ValueType) {
    ClassHelper.BuildClass(this, i);
  }

  isString(): boolean {
    return this.name === 'string';
  }

  isNumber(): boolean {
    return this.name === 'number';
  }

  isDate(): boolean {
    return this.name === 'date';
  }

  isRadio(): boolean {
    return this.name === 'radio';
  }

  isSet(): boolean {
    return this.name === 'set';
  }

  isText(): boolean {
    return this.name === 'text';
  }

  isBoolean(): boolean {
    return this.name === 'boolean';
  }

  isFiles(): boolean {
    return this.name === 'files';
  }
}

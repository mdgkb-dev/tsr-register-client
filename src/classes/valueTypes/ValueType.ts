import ValueRelation from '@/interfaces/valueTypes/ValueRelation';
import ValueTypes from '@/interfaces/valueTypes/ValueTypes';
import ValueTypesComponentMap from '@/interfaces/valueTypes/ValueTypesComponentMap';
import ClassHelper from '@/services/ClassHelper';

export default class ValueType {
  id?: string;
  name: ValueTypes = ValueTypes.String;
  valueRelation: ValueRelation = ValueRelation.simple;

  constructor(i?: ValueType) {
    ClassHelper.BuildClass(this, i);
  }

  isString(): boolean {
    return this.name === ValueTypes.String;
  }

  isNumber(): boolean {
    return this.name === ValueTypes.Number;
  }

  isDate(): boolean {
    return this.name === ValueTypes.Date;
  }

  isRadio(): boolean {
    return this.name === ValueTypes.Radio;
  }

  isSet(): boolean {
    return this.name === ValueTypes.Set;
  }

  isText(): boolean {
    return this.name === ValueTypes.Text;
  }

  isBoolean(): boolean {
    return this.name === ValueTypes.Boolean;
  }

  isFiles(): boolean {
    return this.name === ValueTypes.Files;
  }

  getComponentType(): string | undefined {
    if (this.name === ValueTypes.Radio) {
      return 'RadioProp';
    }
    if (this.name === ValueTypes.Set) {
      return 'SetProp';
    }
    return ValueTypesComponentMap[this.name].name;
  }
}

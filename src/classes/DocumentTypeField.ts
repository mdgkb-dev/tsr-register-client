import ValueType from '@/classes/valueTypes/ValueType';
import ClassHelper from '@/services/ClassHelper';

export default class DocumentTypeField {
  id?: string;
  name = '';
  order = 0;
  valueType: ValueType = new ValueType();
  valueTypeId?: string;

  constructor(i?: DocumentTypeField) {
    ClassHelper.BuildClass(this, i);
  }
}
import ValueType from '@/services/classes/ValueType';
import ClassHelper from '@/services/ClassHelper';

export default class DocumentTypeField {
  id?: string;
  name = '';
  order = 0;
  valueType: ValueType = new ValueType();
  valueTypeId?: string;
  documentTypeId?: string;
  code = '';
  constructor(i?: DocumentTypeField) {
    ClassHelper.BuildClass(this, i);
  }
}

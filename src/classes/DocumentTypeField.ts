import ValueType from '@/classes/valueTypes/ValueType';
import ClassHelper from '@/services/ClassHelper';

import DocumentType from './DocumentType';

export default class DocumentTypeField {
  id?: string;
  name = '';
  order = 0;
  valueType: ValueType = new ValueType();
  valueTypeId?: string;
  documentType: DocumentType = new DocumentType();
  documentTypeId?: string;
  code = '';
  constructor(i?: DocumentTypeField) {
    ClassHelper.BuildClass(this, i);
  }
}

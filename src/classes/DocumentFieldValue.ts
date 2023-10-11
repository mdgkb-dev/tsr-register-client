import { v4 as uuidv4 } from 'uuid';

import DocumentTypeField from '@/classes/DocumentTypeField';
import ClassHelper from '@/services/ClassHelper';

export default class DocumentFieldValue {
  id?: string;
  documentId?: string;
  documentTypeField: DocumentTypeField = new DocumentTypeField();
  documentTypeFieldId?: string;
  order = 0;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;

  constructor(i?: DocumentFieldValue) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateFromType(docTypeField: DocumentTypeField): DocumentFieldValue {
    const field = new DocumentFieldValue();
    field.id = uuidv4();
    field.documentTypeFieldId = docTypeField.id;
    field.order = docTypeField.order;
    return field;
  }
}

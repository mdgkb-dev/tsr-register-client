import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';

export default class DocumentFieldValue implements IDocumentFieldValue {
  id?: string;
  documentId?: string;
  documentTypeField!: IDocumentTypeField;
  documentTypeFieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;

  constructor(value?: IDocumentFieldValue) {
    if (!value) {
      return;
    }

    this.id = value.id;
    this.documentId = value.documentId;
    this.documentTypeField = value.documentTypeField;
    this.documentTypeFieldId = value.documentTypeFieldId;

    if (value.valueString) {
      this.valueString = value.valueString;
    }

    if (value.valueNumber) {
      this.valueNumber = value.valueNumber;
    }

    if (value.valueDate) {
      this.valueDate = value.valueDate;
    }
  }
}

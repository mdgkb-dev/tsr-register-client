import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default class DocumentFieldValue implements IDocumentFieldValue {
  id: string = '';
  documentId: string = '';
  documentTypeFieldId: string = '';
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;

  constructor(value?: IDocumentFieldValue) {
    if (!value) {
      return;
    }

    this.id = value.id;
    this.documentId = value.documentId;
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

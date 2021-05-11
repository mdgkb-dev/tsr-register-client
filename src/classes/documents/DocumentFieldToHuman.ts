import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default class DocumentFieldToHuman implements IDocumentFieldValue {
  id?: string;
  humanId?: string;
  documentFieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date | null;

  constructor(documentFieldToHuman?: IDocumentFieldValue) {
    if (!documentFieldToHuman) {
      return;
    }
    this.id = documentFieldToHuman.id;
    this.humanId = documentFieldToHuman.humanId;
    this.documentFieldId = documentFieldToHuman.documentFieldId;
    this.valueString = documentFieldToHuman.valueString;
    this.valueNumber = documentFieldToHuman.valueNumber;
    this.valueDate = documentFieldToHuman.valueDate;
  }
}

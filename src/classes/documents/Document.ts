import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';

export default class Document implements IDocument {
  id: string = '';
  documentTypeId: string = '';
  humanId: string = '';
  documentFieldValues: IDocumentFieldValue[] = [];

  constructor(document?: IDocument) {
    if (!document) {
      return;
    }

    this.id = document.id;
    this.documentTypeId = document.documentTypeId;
    this.humanId = document.humanId;

    if (document.documentFieldValues) {
      this.documentFieldValues = document.documentFieldValues.map((value) => new DocumentFieldValue(value));
    }
  }
}

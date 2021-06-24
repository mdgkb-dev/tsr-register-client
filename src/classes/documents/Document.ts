import { v4 as uuidv4 } from 'uuid';

import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';

export default class Document implements IDocument {
  id?: string = uuidv4();
  documentType!: IDocumentType;
  humanId?: string = '';
  documentFieldValues: IDocumentFieldValue[] = [];
  isDraft? = false;

  constructor(document?: IDocument) {
    if (!document) {
      return;
    }

    if (document.id) {
      this.id = document.id;
    }

    this.documentType = document.documentType;
    this.humanId = document.humanId;

    if (document.documentFieldValues) {
      this.documentFieldValues = document.documentFieldValues.map((value) => new DocumentFieldValue(value));
    }

    this.isDraft = document.isDraft ?? false;
  }
}

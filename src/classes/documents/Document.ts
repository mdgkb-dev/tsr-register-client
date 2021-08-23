import { v4 as uuidv4 } from 'uuid';

import DocumentFieldValue from '@/classes/documents/DocumentFieldValue';
import DocumentType from '@/classes/documents/DocumentType';
import IDocument from '@/interfaces/documents/IDocument';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';
import FileInfoToDocument from '@/classes/documents/FileInfoToDocument';

export default class Document implements IDocument {
  id?: string = uuidv4();
  documentType!: IDocumentType;
  documentTypeId?: string;
  humanId?: string = '';
  documentFieldValues: IDocumentFieldValue[] = [];
  isDraft? = false;
  fileInfoToDocument: IFileInfoToDocument[] = [];

  constructor(i?: IDocument) {
    if (!i) return;
    this.id = i.id;
    this.documentType = new DocumentType(i.documentType);
    this.humanId = i.humanId;
    this.documentTypeId = i.documentTypeId;
    if (i.documentFieldValues) this.documentFieldValues = i.documentFieldValues.map((value) => new DocumentFieldValue(value));
    this.isDraft = i.isDraft ?? false;
    if (i.fileInfoToDocument)
      this.fileInfoToDocument = i.fileInfoToDocument.map((item: IFileInfoToDocument) => new FileInfoToDocument(item));
  }
}

import IDocumentField from '@/interfaces/documents/IDocumentField';
import IDocument from '@/interfaces/documents/IDocument';
import DocumentFieldToHuman from '@/classes/documents/DocumentFieldToHuman';
import DocumentField from '@/classes/documents/DocumentField';

export default class Document implements IDocument {
  id?: string;
  name: string = '';
  documentFields?: IDocumentField[];

  constructor(document?: IDocument) {
    if (!document) {
      return;
    }
    this.id = document.id;
    this.name = document.name;
    if (document.documentFields) {
      this.documentFields = document.documentFields.map(d => new DocumentField(d));
    }
    console.log(this);
  }
}

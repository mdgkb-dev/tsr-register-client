import IDocumentField from '@/interfaces/documents/IDocumentField';
import IDocument from '@/interfaces/documents/IDocument';

export default class Document implements IDocument {
  id?: string;

  name: string;

  documentFields?: IDocumentField[];

  constructor() {
    this.name = '';
    this.documentFields = [];
  }
}

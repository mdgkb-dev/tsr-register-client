import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';

export default class DocumentScan implements IDocumentScan {
  id?: string;
  documentId?: string;
  humanId?: string;
  url?: string;
  name?: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.documentId = '';
    this.humanId = '';
    this.url = '';
    this.name = '';
  }
}

import IFile from '@/interfaces/documentScans/IFile';

export default interface IDocumentScan {
  id?: string;
  documentId?: string;
  humanId?: string;
  url?: string;
  name?: string;
}

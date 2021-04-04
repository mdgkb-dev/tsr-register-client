import IFile from '@/interfaces/documentScans/IFile';

export default interface IDocumentScan {
  documentId?: number;
  humanId?: number;
  file?: IFile;
}

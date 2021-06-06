import IDocumentType from '@/interfaces/documents/IDocumentType';

export default interface State {
  documentType?: IDocumentType;
  documentTypes?: IDocumentType[];
}

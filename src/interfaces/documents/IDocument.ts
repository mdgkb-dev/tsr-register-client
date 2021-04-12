import IDocumentField from './IDocumentField';

export default interface IDocument {
  id?: string;
  name: string;
  documentFields: IDocumentField[];
}

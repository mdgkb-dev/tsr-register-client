import IDocumentField from './IDocumentField';

export default interface IDocument {
  id?: number;
  name: string;
  documentFields?: IDocumentField[];
}

import IDocumentField from './IDocumentField';

export default interface IDocument {
  name: string;
  documentFields?: IDocumentField[];
}

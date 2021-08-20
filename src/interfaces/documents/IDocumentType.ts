import IDocumentTypeField from './IDocumentTypeField';

export default interface IDocumentType {
  id?: string;
  name: string;
  documentTypeFields: IDocumentTypeField[];
  documentTypeFieldsForDelete: string[];
}

import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';

export default interface IDocumentFieldValue {
  id?: string;
  documentId?: string;
  documentTypeField: IDocumentTypeField;
  documentTypeFieldId?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;
}

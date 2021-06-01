import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default interface IDocument {
  id: string;
  documentTypeId: string;
  humanId: string;
  documentFieldValues: IDocumentFieldValue[];
}

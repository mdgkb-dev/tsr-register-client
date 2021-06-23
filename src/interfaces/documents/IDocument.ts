import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentType from '@/interfaces/documents/IDocumentType';

export default interface IDocument {
  id?: string;
  documentType: IDocumentType;
  humanId?: string;
  documentFieldValues: IDocumentFieldValue[];
  isDraft?: boolean;
}

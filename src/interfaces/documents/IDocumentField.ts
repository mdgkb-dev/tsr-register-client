import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default interface IDocumentField {
  id?: string;
  name: string;
  order: number;
  type: string;
  documentFieldToHuman?: IDocumentFieldValue[];
}

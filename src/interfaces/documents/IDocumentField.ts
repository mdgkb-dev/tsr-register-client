import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default interface IDocumentField {
  id?: number;
  name: string;
  type: string;
  documentFieldToHuman?: IDocumentFieldValue[];
}

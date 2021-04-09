import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default interface IDocumentField {
  id?: string;
  name: string;
  type: string;
  documentFieldToHuman?: IDocumentFieldValue[];
}

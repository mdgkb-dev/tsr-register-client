import IDocumentField from '@/interfaces/documents/IDocumentField';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default class DocumentField implements IDocumentField {
  id?: string;

  name: string;

  type: string;

  order: number;

  documentFieldToHuman?: IDocumentFieldValue[];

  constructor() {
    this.name = '';
    this.type = '';
    this.order = 0;
    this.documentFieldToHuman = [];
  }
}

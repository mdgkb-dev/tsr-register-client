import IDocumentField from '@/interfaces/documents/IDocumentField';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';

export default class DocumentField implements IDocumentField {
  id?: string;
  name: string;
  type: string;
  documentFieldToHuman?: IDocumentFieldValue[];

  constructor() {
    this.id = '';
    this.name = '';
    this.type = '';
    this.documentFieldToHuman = [];
  }
}

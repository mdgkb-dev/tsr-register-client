import IDocumentField from '@/interfaces/documents/IDocumentField';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import DocumentFieldToHuman from '@/classes/documents/DocumentFieldToHuman';

export default class DocumentField implements IDocumentField {
  id?: string;
  name = '';
  type = '';
  order = 0;
  documentFieldToHuman?: IDocumentFieldValue[];

  constructor(documentField?: IDocumentField) {
    if (!documentField) {
      return;
    }
    this.id = documentField.id;
    this.name = documentField.name;
    this.type = documentField.type;
    this.order = documentField.order;
    if (documentField.documentFieldToHuman) {
      this.documentFieldToHuman = documentField.documentFieldToHuman.map((d) => new DocumentFieldToHuman(d));
    }
  }
}

import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';

export default class DocumentTypeField implements IDocumentTypeField {
  id = '';
  name = '';
  type = '';
  order = 0;

  constructor(documentField?: IDocumentTypeField) {
    if (!documentField) {
      return;
    }

    this.id = documentField.id;
    this.name = documentField.name;
    this.type = documentField.type;
    this.order = documentField.order;
  }
}

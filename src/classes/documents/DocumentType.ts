import DocumentTypeField from '@/classes/documents/DocumentTypeField';
import IDocumentType from '@/interfaces/documents/IDocumentType';
import IDocumentTypeField from '@/interfaces/documents/IDocumentTypeField';

export default class DocumentType implements IDocumentType {
  id?: string;
  name = '';
  documentTypeFields: IDocumentTypeField[] = [];
  documentTypeFieldsForDelete: string[] = [];

  constructor(documentType?: IDocumentType) {
    if (!documentType) return;
    this.id = documentType.id;
    this.name = documentType.name;
    this.documentTypeFields = [];
    if (documentType.documentTypeFields) this.documentTypeFields = documentType.documentTypeFields.map((d) => new DocumentTypeField(d));
  }

  getTagName(): string {
    if (this.name.length > 10) return this.name.replace(/(?<=.{9}).+/g, '...');
    return this.name;
  }
}

import IDocumentType from "@/interfaces/documents/IDocumentType";
import IDocumentTypeField from "@/interfaces/documents/IDocumentTypeField";
import DocumentTypeField from '@/classes/documents/DocumentTypeField'

export default class DocumentType implements IDocumentType {
  id?: string;
  name: string = '';
  documentTypeFields: IDocumentTypeField[] = [];

  constructor(documentType?: IDocumentType) {
    if (!documentType) {
      return;
    }

    this.id = documentType.id;
    this.name = documentType.name;
    this.documentTypeFields = [];

    if (documentType.documentTypeFields) {
      this.documentTypeFields = documentType.documentTypeFields.map((d) => new DocumentTypeField(d));
    }
  }
}

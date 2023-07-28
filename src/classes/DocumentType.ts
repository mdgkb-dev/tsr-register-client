import DocumentTypeField from '@/classes/DocumentTypeField';
import ClassHelper from '@/services/ClassHelper';

export default class DocumentType {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(DocumentTypeField)
  documentTypeFields: DocumentTypeField[] = [];
  documentTypeFieldsForDelete: string[] = [];

  constructor(i?: DocumentType) {
    ClassHelper.BuildClass(this, i);
  }

  getTagName(): string {
    if (this.name.length > 10) return this.name.replace(/(?<=.{9}).+/g, '...');
    return this.name;
  }
}

import DocumentTypeField from '@/classes/DocumentTypeField';
import ClassHelper from '@/services/ClassHelper';

export default class DocumentType {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(DocumentTypeField)
  documentTypeFields: DocumentTypeField[] = [];
  required = false;
  code = '';
  constructor(i?: DocumentType) {
    ClassHelper.BuildClass(this, i);
  }

  getTagName(): string {
    return this.name;
  }

  getFieldByCode(code: string): DocumentTypeField | undefined {
    return this.documentTypeFields.find((d: DocumentTypeField) => d.code === code);
  }
}

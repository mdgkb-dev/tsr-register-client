import { v4 as uuidv4 } from 'uuid';

import DocumentFieldValue from '@/classes/DocumentFieldValue';
import DocumentFileInfo from '@/classes/DocumentFileInfo';
import DocumentType from '@/classes/DocumentType';
import DocumentTypeField from '@/classes/DocumentTypeField';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class Document {
  id?: string;
  documentType: DocumentType = new DocumentType();
  documentTypeId?: string;
  humanId?: string = '';
  @ClassHelper.GetClassConstructor(DocumentFieldValue)
  documentFieldValues: DocumentFieldValue[] = [];
  isDraft? = false;
  @ClassHelper.GetClassConstructor(DocumentFileInfo)
  documentFileInfos: DocumentFileInfo[] = [];

  constructor(i?: Document) {
    ClassHelper.BuildClass(this, i);
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.documentFileInfos.forEach((d: DocumentFileInfo) => fileInfos.push(d.fileInfo));
    return fileInfos;
  }

  static CreateFromType(docType: DocumentType, humanId?: string): Document {
    const doc = new Document();
    doc.documentTypeId = docType.id;
    doc.documentType = docType;
    docType.documentTypeFields.forEach((f: DocumentTypeField) => doc.documentFieldValues.push(DocumentFieldValue.CreateFromType(f)));
    doc.humanId = humanId;
    return doc;
  }

  addFile(): DocumentFileInfo {
    const file = new DocumentFileInfo();
    file.id = uuidv4();
    file.documentId = this.id;
    this.documentFileInfos.push(file);
    return file;
  }

  static CreateSnils(docType: DocumentType, humanId?: string, snils?: string): Document {
    const doc = this.CreateFromType(docType, humanId);
    doc.documentFieldValues.forEach((f: DocumentFieldValue) => (f.valueString = snils));
    return doc;
  }
}

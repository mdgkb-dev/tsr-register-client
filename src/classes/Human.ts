import FileInfo from '@/classes/files/FileInfo';
import Contact from '@/classes/humans/Contact';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IOption from '@/interfaces/shared/IOption';
import ClassHelper from '@/services/ClassHelper';

export default class Human {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  isMale = true;
  dateBirth = new Date();
  addressRegistration = '';
  addressResidential = '';
  contact = new Contact();
  contactId?: string;
  insuranceCompanyToHuman: IInsuranceCompanyToHuman[] = [];
  insuranceCompanyToHumanForDelete: string[] = [];
  documents: IDocument[] = [];
  documentsForDelete: string[] = [];
  fileInfos: IFileInfo[] = [];
  photo: IFileInfo = new FileInfo();
  photoId?: string;

  constructor(i?: Human) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? 'Мужской' : 'Женский';
    }
    return this.isMale ? 'М' : 'Ж';
  }

  removeDocumentFieldValuesIds(): void {
    for (const document of this.documents) {
      if (document.isDraft) {
        for (const value of document.documentFieldValues) {
          value.id = undefined;
        }
      }
    }
  }

  static GetFileInfos(item: Human): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    item.documents.forEach((doc: IDocument) => {
      doc.fileInfoToDocument.forEach((fileInfoToDoc: IFileInfoToDocument) => {
        if (fileInfoToDoc.fileInfo) {
          fileInfos.push(fileInfoToDoc.fileInfo);
        }
      });
    });

    if (item.photo) {
      fileInfos.push(item.photo);
    }

    return fileInfos;
  }

  static GetIsMaleOptions(): IOption[] {
    return [
      { label: 'М', value: 'true' },
      { label: 'Ж', value: 'false' },
    ];
  }

  haveDocument(documentTypeId: string): boolean {
    return !!this.documents.find((doc: IDocument) => doc.documentTypeId === documentTypeId);
  }

  addressesEqual(): boolean {
    return this.addressRegistration === this.addressResidential;
  }
  setResidentialAddress(addressesEqual: boolean): void {
    addressesEqual ? (this.addressResidential = this.addressRegistration) : (this.addressResidential = '');
  }
}

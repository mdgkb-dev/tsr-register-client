import Document from '@/classes/documents/Document';
import Contact from '@/classes/humans/Contact';
import InsuranceCompanyToHuman from '@/classes/insuranceCompanies/InsuranceCompanyToHuman';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/humans/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import FileInfo from '@/classes/files/FileInfo';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';

export default class Human implements IHuman {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  isMale = true;
  dateBirth = '';
  addressRegistration = '';
  addressResidential = '';
  contact = new Contact();
  contactId?: string;
  insuranceCompanyToHuman: IInsuranceCompanyToHuman[] = [];
  insuranceCompanyToHumanForDelete: string[] = [];
  documents: IDocument[] = [];
  documentsForDelete: string[] = [];
  fileInfos: IFileInfo[] = [];
  photo?: IFileInfo;
  photoId?: string;
  constructor(i?: IHuman) {
    if (!i) return;

    this.id = i.id;
    this.name = i.name ?? '';
    this.surname = i.surname ?? '';
    this.patronymic = i.patronymic ?? '';
    this.isMale = i.isMale ?? true;
    this.dateBirth = i.dateBirth ?? '';
    this.addressRegistration = i.addressRegistration ?? '';
    this.addressResidential = i.addressResidential ?? '';
    this.contact = new Contact(i.contact);
    this.contactId = i.contactId;
    if (i.insuranceCompanyToHuman)
      this.insuranceCompanyToHuman = i.insuranceCompanyToHuman.map((i: IInsuranceCompanyToHuman) => new InsuranceCompanyToHuman(i));
    if (i.documents) this.documents = i.documents.map((i: IDocument) => new Document(i));

    this.fileInfos = i.fileInfos ?? [];
    if (i.photo) this.photo = new FileInfo(i.photo);
    this.photoId = i.photoId;
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

  static GetFileInfos(item: IHuman): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    item.documents.forEach((doc: IDocument) => {
      doc.fileInfoToDocument.forEach((fileInfoToDoc: IFileInfoToDocument) => {
        if (fileInfoToDoc.fileInfo) fileInfos.push(fileInfoToDoc.fileInfo);
      });
    });
    if (item.photo) fileInfos.push(item.photo);
    return fileInfos;
  }
}

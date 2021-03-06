import Document from '@/classes/documents/Document';
import FileInfo from '@/classes/files/FileInfo';
import Contact from '@/classes/humans/Contact';
import InsuranceCompanyToHuman from '@/classes/insuranceCompanies/InsuranceCompanyToHuman';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/humans/IHuman';
import IHumanConstructor from '@/interfaces/humans/IHumanConstructor';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IOption from '@/interfaces/shared/IOption';

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

  constructor(i?: IHumanConstructor) {
    if (!i) {
      return;
    }

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
    this.fileInfos = i.fileInfos ?? [];
    this.photoId = i.photoId;

    if (i.insuranceCompanyToHuman) {
      this.insuranceCompanyToHuman = i.insuranceCompanyToHuman.map((i: IInsuranceCompanyToHuman) => new InsuranceCompanyToHuman(i));
    }

    if (i.documents) {
      this.documents = i.documents.map((i: IDocument) => new Document(i));
    }

    if (i.photo) {
      this.photo = new FileInfo(i.photo);
    }
  }

  getFullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? '??????????????' : '??????????????';
    }
    return this.isMale ? '??' : '??';
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
      { label: '??', value: 'true' },
      { label: '??', value: 'false' },
    ];
  }

  haveDocument(documentTypeId: string): boolean {
    return !!this.documents.find((doc: IDocument) => doc.documentTypeId === documentTypeId);
  }
}

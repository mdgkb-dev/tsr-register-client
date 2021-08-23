import Document from '@/classes/documents/Document';
import Contact from '@/classes/humans/Contact';
import InsuranceCompanyToHuman from '@/classes/insuranceCompanies/InsuranceCompanyToHuman';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/humans/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';

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

  constructor(human?: IHuman) {
    if (!human) return;

    this.id = human.id;
    this.name = human.name ?? '';
    this.surname = human.surname ?? '';
    this.patronymic = human.patronymic ?? '';
    this.isMale = human.isMale ?? true;
    this.dateBirth = human.dateBirth ?? '';
    this.addressRegistration = human.addressRegistration ?? '';
    this.addressResidential = human.addressResidential ?? '';
    this.contact = new Contact(human.contact);
    this.contactId = human.contactId;
    if (human.insuranceCompanyToHuman) {
      this.insuranceCompanyToHuman = human.insuranceCompanyToHuman.map((i: IInsuranceCompanyToHuman) => new InsuranceCompanyToHuman(i));
    }

    if (human.documents) {
      this.documents = human.documents.map((i: IDocument) => new Document(i));
    }

    this.fileInfos = human.fileInfos ?? [];
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
}

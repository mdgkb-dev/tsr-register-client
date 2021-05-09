import IHuman from '@/interfaces/humans/IHuman';
import IContact from '@/interfaces/humans/IContact';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import Contact from '@/classes/humans/Contact';
import DocumentFieldToHuman from '@/classes/documents/DocumentFieldToHuman';

export default class Human implements IHuman {
  id?: string;
  name = '';
  surname = '';
  patronymic = '';
  gender = '';
  dateBirth = '';
  addressRegistration = '';
  addressResidential = '';
  contact: IContact = new Contact();
  documentFieldToHuman: IDocumentFieldValue[] = [];
  documentScans: IDocumentScan[] = [];
  insuranceCompanyToHuman: IInsuranceCompanyToHuman[] = [];

  constructor(human?: IHuman) {
    if (!human) {
      return;
    }
    this.id = human.id;
    this.name = human.name ?? '';
    this.surname = human.surname ?? '';
    this.patronymic = human.patronymic ?? '';
    this.gender = human.gender ?? '';
    this.dateBirth = human.dateBirth ?? '';
    this.addressRegistration = human.addressRegistration ?? '';
    this.addressResidential = human.addressResidential ?? '';
    this.contact = new Contact(human.contact);
    this.documentFieldToHuman = human.documentFieldToHuman.map(() => new DocumentFieldToHuman());
    this.documentScans = [];
    this.insuranceCompanyToHuman = [];
  }

  getFullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }
  getGender(): string {
    return this.gender === 'male' ? 'М' : 'Ж';
  }
}

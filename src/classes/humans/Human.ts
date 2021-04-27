import IHuman from '@/interfaces/humans/IHuman';
import IContact from '@/interfaces/humans/IContact';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import Contact from '@/classes/humans/Contact';

export default class Human implements IHuman {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  dateBirth: string;
  addressRegistration: string;
  addressResidential: string;
  contact: IContact;
  documentFieldToHuman?: IDocumentFieldValue[];
  documentScans: IDocumentScan[];
  insuranceCompanyToHuman: IInsuranceCompanyToHuman[];

  constructor() {
    this.name = '';
    this.surname = '';
    this.patronymic = '';
    this.gender = '';
    this.dateBirth = '';
    this.addressRegistration = '';
    this.addressResidential = '';
    this.contact = new Contact();
    this.documentFieldToHuman = [];
    this.documentScans = [];
    this.insuranceCompanyToHuman = [];
  }
}

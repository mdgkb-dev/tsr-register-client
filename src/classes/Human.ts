import { v4 as uuidv4 } from 'uuid';

import Document from '@/classes/Document';
import DocumentType from '@/classes/DocumentType';
import FileInfo from '@/classes/files/FileInfo';
import Contact from '@/classes/humans/Contact';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IOption from '@/interfaces/shared/IOption';
import ValidationRule from '@/services/classes/ValidationRules';
import ClassHelper from '@/services/ClassHelper';

interface Rules {
  surname: ValidationRule[];
  name: ValidationRule[];
  patronymic: ValidationRule[];
  addressRegistration: ValidationRule[];
  addressResidential: ValidationRule[];
}

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
  @ClassHelper.GetClassConstructor(Document)
  documents: Document[] = [];
  documentsForDelete: string[] = [];
  fileInfos: IFileInfo[] = [];
  photo: IFileInfo = new FileInfo();
  photoId?: string;
  validationRules: Rules = {
    surname: [ValidationRule.Create('Необходимо указать фамилию')],
    name: [ValidationRule.Create('Необходимо указать имя')],
    patronymic: [ValidationRule.Create('Необходимо указать отчество')],
    addressRegistration: [ValidationRule.Create('Необходимо указать адрес регистрации')],
    addressResidential: [ValidationRule.Create('Необходимо указать адрес проживания')],
  };

  editNameMode = false;

  constructor(i?: Human) {
    ClassHelper.BuildClass(this, i);
  }

  getFullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }

  getShortName(): string {
    return `${this.name.slice(0, 1)}.${this.patronymic.slice(0, 1)}. ${this.surname}`;
  }

  setFullName(human: Human): void {
    this.surname = human.surname;
    this.name = human.name;
    this.patronymic = human.patronymic;
  }

  getGender(full?: boolean): string {
    if (full) {
      return this.isMale ? 'Мужской' : 'Женский';
    }
    return this.isMale ? 'М' : 'Ж';
  }

  static GetFileInfos(item: Human): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];

    // item.documents.forEach((doc: Document) => {
    //   doc.fi.forEach((fileInfoToDoc: IFileInfoToDocument) => {
    //     if (fileInfoToDoc.fileInfo) {
    //       fileInfos.push(fileInfoToDoc.fileInfo);
    //     }
    //   });
    // });

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

  addressesEqual(): boolean {
    return this.addressRegistration === this.addressResidential;
  }

  setResidentialAddress(addressesEqual: boolean): void {
    addressesEqual ? (this.addressResidential = this.addressRegistration) : (this.addressResidential = '');
  }

  setName(item: string): void {
    this.name = item;
  }

  setSurname(item: string): void {
    this.surname = item;
  }

  setPatronymic(item: string): void {
    this.patronymic = item;
  }

  addDocument(docType: DocumentType): Document {
    const doc = Document.CreateFromType(docType, this.id);
    doc.id = uuidv4();
    this.documents.push(doc);
    return doc;
  }

  setEditNameMode(value: boolean): void {
    this.editNameMode = value;
  }

  getValidationRules(): Rules {
    return this.validationRules;
    // return {
    //   surname: [{ required: true, message: 'Необходимо указать фамилию', trigger: 'blur' }],
    //   name: [{ required: true, message: 'Необходимо указать имя', trigger: 'blur' }],
    //   patronymic: [{ required: true, message: 'Необходимо указать отчество', trigger: 'blur' }],
    // };
  }

  resetValidationRules(): void {
    for (const key of Object.keys(this.validationRules)) {
      this.validationRules[key as keyof typeof this.validationRules][0].required = false;
    }
  }

  updateValidationRule(key: string): void {
    this.validationRules[key as keyof typeof this.validationRules][0].required = true;
  }

  getOrCreateDocument(documentType: DocumentType): Document {
    const foundDoc = this.documents.find((d: Document) => d.documentTypeId === documentType.id);
    if (foundDoc) {
      return foundDoc;
    }
    const newDoc = this.addDocument(documentType);
    return newDoc;
  }

  documentTypeExists(id?: string): boolean {
    return this.documents.some((d: Document) => d.documentTypeId === id);
  }

  setDateBirth(date: string): void {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    this.dateBirth = new Date(date.replace(pattern, '$3-$2-$1'));
  }

  // возраст человека на момент dateinput
  getAge(dateinput: Date | string | undefined): string {
    if (!dateinput) {
      return '';
    }
    const date = new Date(dateinput);
    const age = date.getFullYear() - this.dateBirth.getFullYear();
    const m = date.getMonth() - this.dateBirth.getMonth();
    const result = `${age} лет`;
    if (m) {
      return result + `, ${m} мес.`;
    }
    return result;
  }
  removePhoto(): void {
    this.photo = new FileInfo()
    this.photoId = undefined
  }
}

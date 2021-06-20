import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IDocument from '@/interfaces/documents/IDocument';
import FileInfo from '@/interfaces/files/IFileInfo';
import IContact from './IContact';

export default interface IHuman {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  isMale: boolean;
  dateBirth: string;
  addressRegistration: string;
  addressResidential: string;
  contact: IContact;
  insuranceCompanyToHuman: IInsuranceCompanyToHuman[];
  documents: IDocument[];
  fileInfos: FileInfo[];

  getFullName: () => string;
  getGender: (full?: boolean) => string;
  removeDocumentsIds: () => void;
  removeDocumentFieldValuesIds: () => void;
}

import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IContact from './IContact';
import IDocument from '@/interfaces/documents/IDocument';
import FileInfo from '@/interfaces/files/IFileInfo';

export default interface IHuman {
  id: string;
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
}

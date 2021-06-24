import FileInfo from '@/interfaces/files/IFileInfo';
import IContact from '@/interfaces//humans/IContact';
import IDocument from '@/interfaces/documents/IDocument';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';

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
  removeDocumentFieldValuesIds: () => void;
}

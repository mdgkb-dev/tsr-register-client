import IContact from '@/interfaces//humans/IContact';
import IDocument from '@/interfaces/documents/IDocument';
import FileInfo from '@/interfaces/files/IFileInfo';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IFileInfo from '@/interfaces/files/IFileInfo';

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
  contactId?: string;
  insuranceCompanyToHuman: IInsuranceCompanyToHuman[];
  insuranceCompanyToHumanForDelete: string[];
  documents: IDocument[];
  documentsForDelete: string[];
  fileInfos: FileInfo[];
  photo?: FileInfo;
  photoId?: string;

  getFullName: () => string;
  getGender: (full?: boolean) => string;
  removeDocumentFieldValuesIds: () => void;
}

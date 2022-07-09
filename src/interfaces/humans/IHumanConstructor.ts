import IContact from '@/interfaces//humans/IContact';
import IDocument from '@/interfaces/documents/IDocument';
import FileInfo from '@/interfaces/files/IFileInfo';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';

export default interface IHumanConstructor {
  id?: string;
  name: string;
  surname: string;
  patronymic: string;
  isMale: boolean;
  dateBirth: Date;
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
}

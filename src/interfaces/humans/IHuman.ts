import IContact from './IContact';
import IDocumentFieldValue from '@/interfaces/documents/IDocumentFieldValue';
import IDocumentScan from '@/interfaces/documentScans/IDocumentScan';

export default interface IHuman {
  id?: number;
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  dateBirth: string;
  addressRegistration: string;
  addressResidential: string;
  contact: IContact;
  documentFieldToHuman?: IDocumentFieldValue[];
  documentScan?: IDocumentScan[];
}

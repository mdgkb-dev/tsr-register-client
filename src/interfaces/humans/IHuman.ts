import IContact from './IContact';
import IField from '../documents/IField';

export default interface IHuman {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  gender: string;
  dateBirth: string;
  addressRegistration: string;
  addressResidential: string;
  contact: IContact;
  documentFields: IField[];
}
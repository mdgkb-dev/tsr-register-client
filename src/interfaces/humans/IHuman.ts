import IContact from './IContact';

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
}
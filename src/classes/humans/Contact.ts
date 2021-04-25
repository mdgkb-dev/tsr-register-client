import IContact from '@/interfaces/humans/IContact';

export default class Contact implements IContact {
  phone: string;
  email: string;

  constructor() {
    this.phone = '';
    this.email = '';
  }
}

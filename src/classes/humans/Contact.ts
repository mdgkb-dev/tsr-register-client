import IContact from '@/interfaces/humans/IContact';

export default class Contact implements IContact {
  phone = '';
  email = '';

  constructor(contact?: IContact) {
    if (!contact) {
      return;
    }
    this.phone = contact.phone;
    this.email = contact.email;
  }
}

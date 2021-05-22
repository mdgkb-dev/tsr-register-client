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

  static getEmailRegExp(): RegExp {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  static getPhoneRegExp(): RegExp {
    return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  }

  static validatePhone = (rule: any, value: any, callback: any): void => {
    if (Contact.getPhoneRegExp().test(value) || !value) {
      callback();
    } else {
      callback(new Error('Пожалуйста, введите корректный номер телефона'));
    }
  };

  static validateEmail = (rule: any, value: any, callback: any): void => {
    if (Contact.getEmailRegExp().test(value) || !value) {
      callback();
    } else {
      callback(new Error('Пожалуйста, введите корректный email'));
    }
  };
}

import IContact from '@/interfaces/humans/IContact';

export default class Contact implements IContact {
  id?: string;
  phone: string = '';
  email: string = '';

  constructor(i?: IContact) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.phone = i.phone;
    this.email = i.email;
  }

  formatPhoneNumber = (): void => {
    let value = this.phone;
    if (!value) {
      this.phone = value;
    } else {
      if ((value[0] === '7' || value[0] === '8') && value.length !== 1) value = value.slice(1);
      const phoneNumber = value.replace(/\+7|[^\d]/g, '');
      const phoneNumberLength = phoneNumber.length;
      switch (true) {
        case phoneNumberLength === 0:
          this.phone = '';
          console.log(1);
          break;
        case phoneNumberLength === 1 && value.length === 1 && phoneNumber === '7':
        case phoneNumberLength === 1 && value.length === 1 && phoneNumber === '8':
          this.phone = '+7 (';
          console.log(2);
          break;
        case phoneNumberLength < 4:
          this.phone = `+7 (${phoneNumber}`;
          console.log(3);
          break;
        case phoneNumberLength < 7:
          this.phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
          console.log(4);
          break;
        case phoneNumberLength < 9:
          this.phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}`;
          console.log(5);
          break;
        default:
          this.phone = `+7 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 8)}-${phoneNumber.slice(8, 10)}`;
          break;
      }
    }
  };

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

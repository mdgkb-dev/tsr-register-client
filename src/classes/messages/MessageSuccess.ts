import IMessage from '@/interfaces/shared/IMessage';

export default class MessageSuccess implements IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: string;

  constructor() {
    this.dangerouslyUseHTMLString = false;
    this.message = 'Изменения успешно сохранены';
    this.type = 'success';
  }
}

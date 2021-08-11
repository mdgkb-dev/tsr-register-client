import { MessageType } from "element-plus/lib/el-message/src/types";
import IMessage from '@/interfaces/shared/IMessage';

export default class MessageSuccess implements IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: MessageType;

  constructor() {
    this.dangerouslyUseHTMLString = false;
    this.message = 'Изменения успешно сохранены';
    this.type = 'success';
  }
}

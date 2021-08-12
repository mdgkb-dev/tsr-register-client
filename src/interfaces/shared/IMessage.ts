import { MessageType } from 'element-plus/lib/el-message/src/types';

export default interface IMessage {
  dangerouslyUseHTMLString: boolean;
  message: string;
  type: MessageType;
}

import IRegister from '@/interfaces/IRegister';
import IValueType from '@/interfaces/valueTypes/IValueType';

export interface State {
  registers: IRegister[];
  item: IRegister;
  valueTypes: IValueType[];
  activeCollapseName: string;
}

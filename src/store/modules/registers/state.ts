import IRegister from '@/interfaces/registers/IRegister';

export interface State {
  registers: IRegister[];
  register?: IRegister;
}

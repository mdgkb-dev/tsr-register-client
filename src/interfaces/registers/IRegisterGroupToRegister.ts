import IRegister from '@/interfaces/registers/IRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

export default interface IRegisterGroupToRegister {
  id?: string;
  registerId?: string;
  registerGroupId?: string;
  order: number;

  registerGroup?: IRegisterGroup;
  register?: IRegister;
}

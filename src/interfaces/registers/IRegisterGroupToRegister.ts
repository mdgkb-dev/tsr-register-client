import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegister from '@/interfaces/registers/IRegister';

export default interface IRegisterGroupToRegister {
  id?: string;
  registerId?: string;
  registerGroupId?: string;

  registerGroup?: IRegisterGroup;
  register?: IRegister;
}

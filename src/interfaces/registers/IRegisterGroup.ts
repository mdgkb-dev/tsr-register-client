import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';

export default interface IRegisterGroup {
  id?: string;
  name?: string;
  registerPropertyToRegisterGroup: IRegisterPropertyToRegisterGroup[];
}

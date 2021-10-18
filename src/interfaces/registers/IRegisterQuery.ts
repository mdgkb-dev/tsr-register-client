import IRegisterQueryToRegisterProperty from '@/interfaces/registers/IRegisterQueryToRegisterProperty';

export default interface IRegisterQuery {
  id?: string;
  name?: string;
  type?: 'plain' | 'group' | 'aggregate';
  registerId?: string;
  registerQueryToRegisterProperty: IRegisterQueryToRegisterProperty[];
  registerQueryToRegisterPropertyForDelete: string[];
}

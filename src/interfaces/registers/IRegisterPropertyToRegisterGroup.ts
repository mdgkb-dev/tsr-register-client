import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterPropertyToRegisterGroup {
  id?: string;
  registerPropertyId?: string;
  registerGroupId?: string;
  order: number;

  registerProperty?: IRegisterProperty;
  registerGroup?: IRegisterGroup;
}

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

export default interface IRegisterPropertyToRegisterGroup {
  id?: string;
  registerPropertyId?: string;
  registerGroupId?: string;

  registerProperty?: IRegisterProperty;
  registerGroup?: IRegisterGroup;
}

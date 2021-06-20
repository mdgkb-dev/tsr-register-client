import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterPropertySet {
  id?: string;
  name: string;
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;
}

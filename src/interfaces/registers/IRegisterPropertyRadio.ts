import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterPropertyRadio {
  id?: string;
  name: string;
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;
}

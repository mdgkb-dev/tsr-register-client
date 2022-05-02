import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterPropertyExample {
  id?: string;
  name: string;
  order: number;
  registerProperty: IRegisterProperty;
  registerPropertyId?: string;
}

import IRegisterProperty from '@/interfaces/IRegisterProperty';

export default interface IRegisterPropertyExample {
  id?: string;
  name: string;
  order: number;
  registerProperty: IRegisterProperty;
  registerPropertyId?: string;
}

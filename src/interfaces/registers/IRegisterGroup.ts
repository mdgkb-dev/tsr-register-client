import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterGroup {
  id?: string;
  name: string;
  order: number;
  registerProperties: IRegisterProperty[];
  registerPropertiesForDelete: string[];

  addRegisterProperty: () => void;
  removeRegisterProperty: (index: number) => void;
  sortProperties: () => void;
}

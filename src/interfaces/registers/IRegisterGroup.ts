import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default interface IRegisterGroup {
  id?: string;
  name: string;
  order: number;
  registerProperties: IRegisterProperty[];
  registerPropertiesForDelete: string[];
  isEdit: boolean;

  editRegisterGroup: (isEdit?: boolean) => void;
  addRegisterProperty: (item?: IRegisterProperty) => void;
  removeRegisterProperty: (index: number) => void;
  sortProperties: () => void;
}

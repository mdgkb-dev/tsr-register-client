import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';

export default interface IRegisterPropertySet {
  id?: string;
  name: string;
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;
  isEdit: boolean;

  registerPropertyOthers: IRegisterPropertyOther[];
  registerPropertyOthersForDelete: string[];
  order: number;
  addRegisterPropertyOther: () => void;
  removeRegisterPropertyOther: (index: number) => void;
  editRegisterPropertySet: (isEdit?: boolean) => void;
}

import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyOther from '@/interfaces/IRegisterPropertyOther';

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

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';

export default interface IRegisterPropertyRadio {
  id?: string;
  name: string;
  registerPropertyId?: string;
  registerProperty?: IRegisterProperty;
  registerPropertyOthers: IRegisterPropertyOther[];
  registerPropertyOthersForDelete: string[];
  order: number;
  addRegisterPropertyOther: () => void;
  removeRegisterPropertyOther: (index: number) => void;
}

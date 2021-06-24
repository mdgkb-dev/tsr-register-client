import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default interface IRegisterProperty {
  id?: string;
  name?: string | undefined;
  valueTypeId?: string;
  registerPropertySet: IRegisterPropertySet[];
  registerPropertyRadio: IRegisterPropertyRadio[];
  valueType?: IValueType;
}

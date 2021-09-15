import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default interface IRegisterProperty {
  id?: string;
  name?: string | undefined;
  shortName?: string | undefined;
  colWidth: string;
  valueTypeId?: string;
  registerPropertySet: IRegisterPropertySet[];
  registerPropertyRadio: IRegisterPropertyRadio[];
  valueType?: IValueType;
  withOther: boolean;

  getRegisterPropertyRadioOriginalValue: (id: string) => string;
  getRegisterPropertySetOriginalValue: (id: string) => string;
}

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import IValueType from '@/interfaces/valueTypes/IValueType';
import ValueType from '@/classes/valueTypes/ValueType';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name?: string;
  valueTypeId?: string;
  registerPropertyRadio: IRegisterPropertyRadio[] = [];
  registerPropertySet: IRegisterPropertySet[] = [];
  valueType?: IValueType;

  constructor(item?: IRegisterProperty) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.name = item.name;
    this.valueTypeId = item.valueTypeId;
    if (item.registerPropertySet) this.registerPropertySet = item.registerPropertySet.map((i: IRegisterPropertySet) => new RegisterPropertySet(i));
    if (item.registerPropertyRadio) this.registerPropertyRadio = item.registerPropertyRadio.map((i: IRegisterPropertyRadio) => new RegisterPropertyRadio(i));
    if (item.valueType) this.valueType = new ValueType(item.valueType);
  }
}

import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import ValueType from '@/classes/valueTypes/ValueType';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name?: string;
  valueTypeId?: string;
  registerPropertyRadio: IRegisterPropertyRadio[] = [];
  registerPropertySet: IRegisterPropertySet[] = [];
  valueType?: IValueType;
  withOther = false;

  constructor(item?: IRegisterProperty) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.name = item.name;
    this.valueTypeId = item.valueTypeId;
    this.withOther = item.withOther;
    if (item.registerPropertySet)
      this.registerPropertySet = item.registerPropertySet.map((i: IRegisterPropertySet) => new RegisterPropertySet(i));
    if (item.registerPropertyRadio)
      this.registerPropertyRadio = item.registerPropertyRadio.map((i: IRegisterPropertyRadio) => new RegisterPropertyRadio(i));
    if (item.valueType) this.valueType = new ValueType(item.valueType);
  }
}

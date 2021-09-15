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
  shortName?: string;
  colWidth = '150px';
  valueTypeId?: string;
  registerPropertyRadio: IRegisterPropertyRadio[] = [];
  registerPropertySet: IRegisterPropertySet[] = [];
  valueType?: IValueType;
  withOther = false;

  constructor(registerProperty?: IRegisterProperty) {
    if (!registerProperty) {
      return;
    }
    this.id = registerProperty.id;
    this.name = registerProperty.name;
    this.shortName = registerProperty.shortName;
    this.colWidth = registerProperty.colWidth;
    this.valueTypeId = registerProperty.valueTypeId;
    this.withOther = registerProperty.withOther;
    if (registerProperty.registerPropertySet)
      this.registerPropertySet = registerProperty.registerPropertySet.map((i: IRegisterPropertySet) => new RegisterPropertySet(i));
    if (registerProperty.registerPropertyRadio)
      this.registerPropertyRadio = registerProperty.registerPropertyRadio.map((i: IRegisterPropertyRadio) => new RegisterPropertyRadio(i));
    if (registerProperty.valueType) this.valueType = new ValueType(registerProperty.valueType);
  }

  getRegisterPropertyRadioOriginalValue(id: string): string {
    const radio = this.registerPropertyRadio.find((propertyRadio: IRegisterPropertyRadio) => propertyRadio.id === id);
    if (radio) {
      return radio.name;
    }
    return '';
  }

  getRegisterPropertySetOriginalValue(id: string): string {
    const radio = this.registerPropertySet.find((propertyRadio: IRegisterPropertySet) => propertyRadio.id === id);
    if (radio) {
      return radio.name;
    }
    return '';
  }
}

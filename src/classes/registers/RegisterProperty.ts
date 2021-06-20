import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name?: string;
  valueTypeId?: string;
  registerPropertyRadio: IRegisterPropertyRadio[] = [];
  registerPropertySet: IRegisterPropertySet[] = [];

  constructor(item?: IRegisterProperty) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.name = item.name;
    this.valueTypeId = item.valueTypeId;
    if (item.registerPropertySet) {
      this.registerPropertySet = item.registerPropertySet.map((i: IRegisterPropertySet) => new RegisterPropertySet(i));
    }
    if (item.registerPropertyRadio) {
      this.registerPropertyRadio = item.registerPropertyRadio.map((i: IRegisterPropertyRadio) => new RegisterPropertyRadio(i));
    }
  }
}

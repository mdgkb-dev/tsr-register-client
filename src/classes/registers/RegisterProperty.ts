import RegisterPropertyOther from '@/classes/registers/RegisterPropertyOther';
import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import ValueType from '@/classes/valueTypes/ValueType';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name = 'Свойство';
  shortName = 'Свойство';
  colWidth = '150px';
  valueTypeId?: string;
  order = 0;
  registerPropertyRadios: IRegisterPropertyRadio[] = [];
  registerPropertyRadiosForDelete: string[] = [];
  registerPropertySets: IRegisterPropertySet[] = [];
  registerPropertySetsForDelete: string[] = [];
  registerPropertyOthers: IRegisterPropertyOther[] = [];
  valueType: IValueType = new ValueType();
  withOther = false;
  tag = '';
  showSet = false;
  showRadio = false;

  constructor(i?: IRegisterProperty) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.shortName = i.shortName;
    this.colWidth = i.colWidth;
    this.valueTypeId = i.valueTypeId;
    this.withOther = i.withOther;
    this.order = i.order;
    this.tag = i.tag;
    if (i.registerPropertySets) {
      this.registerPropertySets = i.registerPropertySets.map((i: IRegisterPropertySet) => new RegisterPropertySet(i));
    }
    if (i.registerPropertyRadios) {
      this.registerPropertyRadios = i.registerPropertyRadios.map((i: IRegisterPropertyRadio) => new RegisterPropertyRadio(i));
    }
    if (i.valueType) {
      this.valueType = new ValueType(i.valueType);
    }
    if (i.registerPropertyOthers) {
      this.registerPropertyOthers = i.registerPropertyOthers.map((item: IRegisterPropertyOther) => new RegisterPropertyOther(item));
    }
    this.changeRelation([this.valueType]);
  }

  getRegisterPropertyRadioOriginalValue(id: string): string {
    const radio = this.registerPropertyRadios.find((propertyRadio: IRegisterPropertyRadio) => propertyRadio.id === id);
    if (radio) {
      return radio.name;
    }
    return '';
  }

  getRegisterPropertySetOriginalValue(id: string): string {
    const radio = this.registerPropertySets.find((propertyRadio: IRegisterPropertySet) => propertyRadio.id === id);
    if (radio) {
      return radio.name;
    }
    return '';
  }

  addSetItem(): void {
    this.registerPropertySets.push(new RegisterPropertySet());
  }
  addRadioItem(): void {
    this.registerPropertyRadios.push(new RegisterPropertyRadio());
  }
  removeSetItem(i: number): void {
    const idForDelete = this.registerPropertySets[i].id;
    if (idForDelete) {
      this.registerPropertySetsForDelete.push(idForDelete);
    }
    this.registerPropertySets.splice(i, 1);
  }
  removeRadioItem(i: number): void {
    const idForDelete = this.registerPropertyRadios[i].id;
    if (idForDelete) {
      this.registerPropertyRadiosForDelete.push(idForDelete);
    }
    this.registerPropertyRadios.splice(i, 1);
  }

  changeRelation(valueTypes: IValueType[]): void {
    const valueType = valueTypes.find((i: IValueType) => i.id === this.valueTypeId);
    if (!valueType) {
      return;
    }
    if (valueType.isRadio()) {
      this.showRadio = true;
      this.showSet = false;
      return;
    }
    if (valueType.isSet()) {
      this.showSet = true;
      this.showRadio = false;
      return;
    }
    this.showSet = false;
    this.showRadio = false;
  }

  getOthers(propResult: boolean | string | number | Date | null): IRegisterPropertyOther[] {
    const radioProperty = this.registerPropertyRadios.find((radio: IRegisterPropertyRadio) => radio.id === propResult);
    if (radioProperty) {
      return radioProperty.registerPropertyOthers;
    }
    const setProperty = this.registerPropertySets.find((set: IRegisterPropertySet) => set.id === propResult);
    console.log(setProperty, propResult);
    if (setProperty) {
      return setProperty.registerPropertyOthers;
    }
    return [];
  }
}

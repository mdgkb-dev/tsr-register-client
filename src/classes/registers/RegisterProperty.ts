import RegisterPropertyExample from '@/classes/registers/RegisterPropertyExample';
import RegisterPropertyMeasure from '@/classes/registers/RegisterPropertyMeasure';
import RegisterPropertyOther from '@/classes/registers/RegisterPropertyOther';
import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';
import ValueType from '@/classes/valueTypes/ValueType';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyExample from '@/interfaces/registers/IRegisterPropertyExample';
import IRegisterPropertyMeasure from '@/interfaces/registers/IRegisterPropertyMeasure';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name = '';
  shortName = '';
  colWidth = 150;
  valueTypeId?: string;
  order = 0;
  setFilterString = '';
  registerPropertyRadios: IRegisterPropertyRadio[] = [];
  registerPropertyRadiosForDelete: string[] = [];
  registerPropertySets: IRegisterPropertySet[] = [];
  registerPropertySetsForDelete: string[] = [];
  registerPropertyOthers: IRegisterPropertyOther[] = [];
  registerPropertyExamples: IRegisterPropertyExample[] = [];
  registerPropertyExamplesForDelete: string[] = [];
  valueType: IValueType = new ValueType();
  withOther = false;
  registerPropertyMeasures: IRegisterPropertyMeasure[] = [];
  registerPropertyMeasuresForDelete: string[] = [];
  tag = '';
  showSet = false;
  showRadio = false;
  isEdit = false;

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
    this.isEdit = i.isEdit;
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
    if (i.registerPropertyExamples) {
      this.registerPropertyExamples = i.registerPropertyExamples.map((item: IRegisterPropertyExample) => new RegisterPropertyExample(item));
    }
    if (i.registerPropertyMeasures) {
      this.registerPropertyMeasures = i.registerPropertyMeasures.map((item: IRegisterPropertyMeasure) => new RegisterPropertyMeasure(item));
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

  addRegisterPropertyExample(item?: IRegisterPropertyExample): void {
    this.registerPropertyExamples.push(new RegisterPropertyExample(item));
  }

  removeRegisterPropertyExample(i: number): void {
    const idForDelete = this.registerPropertyExamples[i].id;
    if (idForDelete) {
      this.registerPropertyExamplesForDelete.push(idForDelete);
    }
    this.registerPropertyExamples.splice(i, 1);
  }

  addSetItem(item?: IRegisterPropertySet): void {
    this.registerPropertySets.push(new RegisterPropertySet(item));
  }
  addRadioItem(item?: IRegisterPropertyRadio): void {
    this.registerPropertyRadios.push(new RegisterPropertyRadio(item));
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
    this.valueType = valueType;
  }

  getOthers(propResult: boolean | string | number | Date | null): IRegisterPropertyOther[] {
    const radioProperty = this.registerPropertyRadios.find((radio: IRegisterPropertyRadio) => radio.id === propResult);
    if (radioProperty) {
      return radioProperty.registerPropertyOthers;
    }
    const setProperty = this.registerPropertySets.find((set: IRegisterPropertySet) => set.id === propResult);
    // console.log(setProperty, propResult);
    if (setProperty) {
      return setProperty.registerPropertyOthers;
    }
    return [];
  }

  editRegisterProperty(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  sortExamples(): void {
    this.registerPropertyExamples.forEach((item: IRegisterPropertyExample, index: number) => (item.order = index));
  }

  addRegisterPropertyMeasure(item?: IRegisterPropertyMeasure): void {
    this.registerPropertyMeasures.push(new RegisterPropertyMeasure(item));
  }

  getRegisterPropertySets(): IRegisterPropertySet[] {
    if (this.setFilterString === '') {
      return this.registerPropertySets;
    }

    return this.registerPropertySets.filter((s: IRegisterPropertySet) => {
      return s.name.toLowerCase().includes(this.setFilterString.toLowerCase());
    });
  }
}

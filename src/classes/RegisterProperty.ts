import RegisterPropertyExample from '@/classes/RegisterPropertyExample';
import RegisterPropertyMeasure from '@/classes/RegisterPropertyMeasure';
import RegisterPropertyOther from '@/classes/RegisterPropertyOther';
import RegisterPropertyRadio from '@/classes/RegisterPropertyRadio';
import RegisterPropertySet from '@/classes/RegisterPropertySet';
import RegisterPropertyVariant from '@/classes/RegisterPropertyVariant';
import ValueType from '@/classes/valueTypes/ValueType';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyExample from '@/interfaces/IRegisterPropertyExample';
import IRegisterPropertyMeasure from '@/interfaces/IRegisterPropertyMeasure';
import IRegisterPropertyOther from '@/interfaces/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/IRegisterPropertySet';
import IRegisterPropertyVariant from '@/interfaces/IRegisterPropertyVariant';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default class RegisterProperty implements IRegisterProperty {
  id?: string;
  name = '';
  shortName = '';
  colWidth = 150;
  valueTypeId?: string;
  order = 0;
  setFilterString = '';
  ageCompare = false;
  registerPropertyRadios: IRegisterPropertyRadio[] = [];
  registerPropertyRadiosForDelete: string[] = [];
  registerPropertySets: IRegisterPropertySet[] = [];
  registerPropertySetsForDelete: string[] = [];
  registerPropertyOthers: IRegisterPropertyOther[] = [];
  registerPropertyExamples: IRegisterPropertyExample[] = [];
  registerPropertyExamplesForDelete: string[] = [];

  registerPropertyVariants: IRegisterPropertyVariant[] = [];
  registerPropertyVariantsForDelete: string[] = [];

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
    this.ageCompare = i.ageCompare;
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
    if (i.registerPropertyVariants) {
      this.registerPropertyVariants = i.registerPropertyVariants.map((item: IRegisterPropertyVariant) => new RegisterPropertyVariant(item));
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

  addRegisterPropertyVariant(): void {
    this.registerPropertyVariants.push(new RegisterPropertyVariant());
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

import IRegisterPropertyExample from '@/interfaces/IRegisterPropertyExample';
import IRegisterPropertyMeasure from '@/interfaces/IRegisterPropertyMeasure';
import IRegisterPropertyOther from '@/interfaces/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/IRegisterPropertySet';
import IRegisterPropertyVariant from '@/interfaces/IRegisterPropertyVariant';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default interface IRegisterProperty {
  id?: string;
  name: string;
  shortName: string;
  colWidth: number;
  valueTypeId?: string;
  order: number;
  registerPropertySets: IRegisterPropertySet[];
  registerPropertySetsForDelete: string[];
  registerPropertyOthers: IRegisterPropertyOther[];
  registerPropertyRadios: IRegisterPropertyRadio[];
  registerPropertyRadiosForDelete: string[];
  registerPropertyExamples: IRegisterPropertyExample[];
  registerPropertyExamplesForDelete: string[];
  valueType: IValueType;
  withOther: boolean;
  isEdit: boolean;
  tag: string;
  ageCompare: boolean;
  registerPropertyMeasures: IRegisterPropertyMeasure[];
  registerPropertyMeasuresForDelete: string[];

  registerPropertyVariants: IRegisterPropertyVariant[];
  registerPropertyVariantsForDelete: string[];

  getRegisterPropertyRadioOriginalValue: (id: string) => string;
  getRegisterPropertySetOriginalValue: (id: string) => string;

  editRegisterProperty: (isEdit?: boolean) => void;
  addSetItem: (item?: IRegisterPropertySet) => void;
  removeSetItem: (index: number) => void;
  addRadioItem: (item?: IRegisterPropertyRadio) => void;
  removeRadioItem: (index: number) => void;
  addRegisterPropertyExample: (item?: IRegisterPropertyExample) => void;
  removeRegisterPropertyExample: (index: number) => void;
  showSet: boolean;
  showRadio: boolean;
  sortExamples: () => void;
  changeRelation: (valueTypes: IValueType[]) => void;
  addRegisterPropertyMeasure: (item?: IRegisterPropertyMeasure) => void;
  addRegisterPropertyVariant: () => void;

  getOthers: (propResult: boolean | string | number | Date | null) => IRegisterPropertyOther[];
  setFilterString: string;
  getRegisterPropertySets: () => IRegisterPropertySet[];
}

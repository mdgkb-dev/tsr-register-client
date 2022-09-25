import IRegisterPropertyExample from '@/interfaces/registers/IRegisterPropertyExample';
import IRegisterPropertyMeasure from '@/interfaces/registers/IRegisterPropertyMeasure';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
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
  registerPropertyMeasures: IRegisterPropertyMeasure[];
  registerPropertyMeasuresForDelete: string[];

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

  getOthers: (propResult: boolean | string | number | Date | null) => IRegisterPropertyOther[];
  setFilterString: string;
  getRegisterPropertySets: () => IRegisterPropertySet[];
}

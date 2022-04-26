import IRegisterPropertyExample from '@/interfaces/registers/IRegisterPropertyExample';
import IRegisterPropertyOther from '@/interfaces/registers/IRegisterPropertyOther';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IValueType from '@/interfaces/valueTypes/IValueType';

export default interface IRegisterProperty {
  id?: string;
  name: string;
  shortName: string;
  colWidth: string;
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
  withDates: boolean;
  isEdit: boolean;
  tag: string;

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

  changeRelation: (valueTypes: IValueType[]) => void;

  getOthers: (propResult: boolean | string | number | Date | null) => IRegisterPropertyOther[];
}

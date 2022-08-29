import IPatient from '@/interfaces/patients/IPatient';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyOtherToPatient from '@/interfaces/registers/IRegisterPropertyOtherToPatient';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';

export default interface IRegisterGroupToPatient {
  id?: string;
  date: Date;
  patient: IPatient;
  editMode: boolean;
  patientId?: string;
  registerGroup: IRegisterGroup;
  registerGroupId?: string;

  registerPropertyToPatient: IRegisterPropertyToPatient[];
  registerPropertyOthersToPatient: IRegisterPropertyOtherToPatient[];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[];
  registerPropertySetToPatientForDelete: string[];

  getOtherPropertyValue: (property: IRegisterProperty) => string | undefined;
  getRegisterPropertyValue: (property: IRegisterProperty, originalValue: boolean) => boolean | string | number | Date | null;
  getRegisterPropertyValueSet: (setId: string, propWithDateId?: string) => boolean;
  pushRegisterProperty: (propertyId: string) => void;
  setRegisterPropertyValue: (value: number | string | Date, property: IRegisterProperty) => void;
  setRegisterPropertyValueOther: (value: string, property: IRegisterProperty) => void;
  setRegisterPropertyValueSet: (isAdd: boolean, setId: string, propWithDateId?: string) => void;
  getRegisterPropertyOthers: (propertyOtherId: string) => string;
  setRegisterPropertyOthers: (value: string, propertyOtherId: string) => void;
  getRegisterPropertyValueOthers: (propertyOtherId: string) => string;
  addRegisterValueWithDate: (property: IRegisterProperty) => void;
  getRegisterValuesWithDate: (propertyId: string) => IRegisterPropertyToPatient[];
  removeRegisterValueWithDate: (propId: string) => void;

  setMeasureId: (measureId: string, propertyId: string) => void;
  getMeasureId: (propertyId: string) => string;
}

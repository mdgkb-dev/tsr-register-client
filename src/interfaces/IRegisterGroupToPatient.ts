import IRegisterGroup from '@/interfaces/IRegisterGroup';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import IRegisterPropertyOtherToPatient from '@/interfaces/IRegisterPropertyOtherToPatient';
import IRegisterPropertySetToPatient from '@/interfaces/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/IRegisterPropertyToPatient';
import IPatient from '@/interfaces/patients/IPatient';

export default interface IRegisterGroupToPatient {
  id?: string;
  date: Date;
  patient: IPatient;
  editMode: boolean;
  patientId?: string;
  registerGroup: IRegisterGroup;
  registerGroupId?: string;

  registerPropertyToPatient: IRegisterPropertyToPatient[];
  registerPropertyToPatientForDelete: string[];
  registerPropertyOthersToPatient: IRegisterPropertyOtherToPatient[];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[];
  registerPropertySetToPatientForDelete: string[];

  getOtherPropertyValue: (property: IRegisterProperty) => string | undefined;
  getRegisterPropertyValue: (property: IRegisterProperty, originalValue: boolean) => boolean | string | number | Date | null;
  getRegisterPropertyToPatient: (propertyId: string) => IRegisterPropertyToPatient[];
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

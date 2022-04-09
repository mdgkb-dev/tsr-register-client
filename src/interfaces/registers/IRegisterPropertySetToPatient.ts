import IPatient from '@/interfaces/patients/IPatient';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';

export default interface IRegisterPropertySetToPatient {
  id?: string;
  registerPropertySetId?: string;
  patientId?: string;
  propWithDateId?: string;
  registerPropertySet?: IRegisterPropertySet;
  patient?: IPatient;
}

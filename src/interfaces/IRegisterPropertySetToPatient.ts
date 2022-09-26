import IRegisterPropertySet from '@/interfaces/IRegisterPropertySet';
import IPatient from '@/interfaces/patients/IPatient';

export default interface IRegisterPropertySetToPatient {
  id?: string;
  registerPropertySetId?: string;
  patientId?: string;
  propWithDateId?: string;
  registerPropertySet?: IRegisterPropertySet;
  patient?: IPatient;
}

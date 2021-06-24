import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import IPatient from '@/interfaces/patients/IPatient';

export default interface IRegisterPropertySetToPatient {
  id?: string;
  registerPropertySetId?: string;
  patientId?: string;

  registerPropertySet?: IRegisterPropertySet;
  patient?: IPatient;
}

import IRegister from '@/interfaces/IRegister';
import IPatient from '@/interfaces/patients/IPatient';

export default interface IRegisterToPatient {
  id?: string;
  register?: IRegister;
  registerId?: string;
  patient?: IPatient;
  patientId?: string;
}

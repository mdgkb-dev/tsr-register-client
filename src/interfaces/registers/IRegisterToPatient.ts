import IPatient from '@/interfaces/patients/IPatient';
import IRegister from '@/interfaces/registers/IRegister';

export default interface IRegisterToPatient {
  id?: string;
  register?: IRegister;
  registerId?: string;
  patient?: IPatient;
  patientId?: string;
}

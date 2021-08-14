import Patient from '@/classes/patients/Patient';
import Register from '@/classes/registers/Register';
import IPatient from '@/interfaces/patients/IPatient';
import IRegister from '@/interfaces/registers/IRegister';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';

export default class RegisterToPatient implements IRegisterToPatient {
  id?: string;
  registerId?: string;
  register?: IRegister;
  patientId?: string;
  patient?: IPatient;

  constructor(item?: IRegisterToPatient) {
    if (!item) {
      return;
    }

    this.id = item.id;
    this.registerId = item.registerId;
    if (item.register) this.register = new Register(item.register);
    this.patientId = item.patientId;
    if (item.patient) this.patient = new Patient(item.patient);
  }
}

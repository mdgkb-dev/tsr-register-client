import Patient from '@/classes/Patient';
import Register from '@/classes/Register';
import ClassHelper from '@/services/ClassHelper';

export default class PatientRegister {
  id?: string;
  registerId?: string;
  register = new Register();
  patientId?: string;
  patient = new Patient();

  constructor(i?: PatientRegister) {
    ClassHelper.BuildClass(this, i);
  }
}

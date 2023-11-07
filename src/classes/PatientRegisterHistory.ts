import PatientRegister from '@/classes/PatientRegister';
import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class PatientRegisterHistory {
  id?: string;
  patientRegisterId?: string;
  patientRegister = new PatientRegister();
  userId?: string;
  user = new User();
  date = new Date();
  comment = '';

  constructor(i?: PatientRegisterHistory) {
    ClassHelper.BuildClass(this, i);
  }
}

import { v4 as uuidv4 } from 'uuid';

// import Register from '@/classes/Register';
import User from '@/classes/User';
import ClassHelper from '@/services/ClassHelper';

export default class PatientRegister {
  id?: string;
  registerId?: string;
  // register = new Register();
  patientId?: string;
  // patient = new Patient();
  userId?: string;
  user = new User();

  constructor(i?: PatientRegister) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(patientId: string, register: any): PatientRegister {
    const item = new PatientRegister();
    item.id = uuidv4();
    item.registerId = register.id;
    // item.register = new Register(register);
    item.patientId = patientId;
    return item;
  }
}

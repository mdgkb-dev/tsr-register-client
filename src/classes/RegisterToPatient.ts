import Register from '@/classes/Register';
import IRegister from '@/interfaces/IRegister';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IPatient from '@/interfaces/patients/IPatient';
import ClassBuilder from '@/services/ClassBuilder';

export default class RegisterToPatient implements IRegisterToPatient {
  id?: string;
  registerId?: string;
  register: IRegister = new Register();
  patientId?: string;
  patient?: IPatient;

  constructor(i?: IRegisterToPatient) {
    ClassBuilder.BuildPrimitives(this, i);
  }
}

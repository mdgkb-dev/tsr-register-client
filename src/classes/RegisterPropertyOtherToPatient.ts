import ClassHelper from '@/services/ClassHelper';

export default class RegisterPropertyOtherToPatient {
  id?: string;
  value = '';
  registerPropertyOtherId?: string;
  patientId?: string;

  constructor(i?: RegisterPropertyOtherToPatient) {
    ClassHelper.BuildClass(this, i);
  }
}

import IRegisterPropertyOtherToPatient from '@/interfaces/registers/IRegisterPropertyOtherToPatient';

export default class RegisterPropertyOtherToPatient implements IRegisterPropertyOtherToPatient {
  id?: string;
  value = '';
  registerPropertyOtherId?: string;
  patientId?: string;

  constructor(i?: RegisterPropertyOtherToPatient) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.value = i.value;
    this.patientId = i.patientId;
    this.registerPropertyOtherId = i.registerPropertyOtherId;
  }
}

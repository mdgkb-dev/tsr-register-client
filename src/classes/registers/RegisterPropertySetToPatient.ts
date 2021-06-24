import IPatient from '@/interfaces/patients/IPatient';
import Patient from '@/classes/patients/Patient';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertySet from '@/interfaces/registers/IRegisterPropertySet';
import RegisterPropertySet from '@/classes/registers/RegisterPropertySet';

export default class RegisterPropertySetToPatient implements IRegisterPropertySetToPatient {
  id?: string;
  registerPropertySetId?: string;
  patientId?: string;

  registerPropertySet?: IRegisterPropertySet;
  patient?: IPatient;

  constructor(item?: IRegisterPropertySetToPatient) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.registerPropertySetId = item.registerPropertySetId;
    this.patientId = item.patientId;
    if (item.registerPropertySet) this.registerPropertySet = new RegisterPropertySet(item.registerPropertySet);
    if (item.patient) this.patient = new Patient(item.patient);
  }
}

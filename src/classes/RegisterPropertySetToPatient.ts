import Patient from '@/classes/patients/Patient';
import RegisterPropertySet from '@/classes/RegisterPropertySet';
import IRegisterPropertySet from '@/interfaces/IRegisterPropertySet';
import IRegisterPropertySetToPatient from '@/interfaces/IRegisterPropertySetToPatient';
import IPatient from '@/interfaces/patients/IPatient';

export default class RegisterPropertySetToPatient implements IRegisterPropertySetToPatient {
  id?: string;
  registerPropertySetId?: string;
  patientId?: string;
  propWithDateId?: string;
  registerPropertySet?: IRegisterPropertySet;
  patient?: IPatient;

  constructor(item?: IRegisterPropertySetToPatient) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.registerPropertySetId = item.registerPropertySetId;
    this.patientId = item.patientId;
    this.propWithDateId = item.propWithDateId;
    if (item.registerPropertySet) this.registerPropertySet = new RegisterPropertySet(item.registerPropertySet);
    if (item.patient) this.patient = new Patient(item.patient);
  }
}

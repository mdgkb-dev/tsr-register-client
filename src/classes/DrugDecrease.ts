import Drug from '@/classes/Drug';
import DrugArrive from '@/classes/DrugArrive';
import Patient from '@/classes/Patient';
import ClassHelper from '@/services/ClassHelper';

export default class DrugDecrease {
  id?: string;
  @ClassHelper.GetClassConstructor(DrugArrive)
  drugArrive?: DrugArrive;
  drugArriveId?: string;

  @ClassHelper.GetClassConstructor(Patient)
  patient?: Patient;
  patientId?: string;

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;

  date = new Date();
  arrived = false;
  quantity = 0;

  comment = '';

  constructor(i?: DrugDecrease) {
    ClassHelper.BuildClass(this, i);
  }

  setPatient(patient: Patient): void {
    this.patient = patient;
    this.patientId = patient.id;
  }
}

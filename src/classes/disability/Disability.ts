import IDisability from '@/interfaces/disabilities/IDisability';
import IPeriod from '@/interfaces/shared/IPeriod';
import IPatient from '@/interfaces/patients/IPatient';
import IEdv from '@/interfaces/disabilities/IEdv';
import Period from '@/classes/shared/Period';
import Patient from '@/classes/patients/Patient';

export default class Disability implements IDisability {
  id?: string;
  period?: IPeriod = new Period();
  patient?: IPatient = new Patient();
  patientId?: string;
  edvs: IEdv[] = [];

  constructor(disability?: IDisability) {
    if (!disability) {
      return;
    }
    this.id = disability.id;
    this.period = disability.period;
    this.patientId = disability.patientId;
    this.patient = disability.patient;
    this.edvs = [];
  }
}

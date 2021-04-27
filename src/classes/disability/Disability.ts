import IDisability from '@/interfaces/disabilities/IDisability';
import IPeriod from '@/interfaces/shared/IPeriod';
import IPatient from '@/interfaces/patients/IPatient';
import IEdv from '@/interfaces/disabilities/IEdv';
import Period from '@/classes/shared/Period';

export default class Disability implements IDisability {
  id?: string;
  period?: IPeriod;
  patient?: IPatient;
  patientId?: string;
  edvs?: IEdv[];

  constructor() {
    this.period = new Period();
    this.patientId = '';
    this.edvs = [];
  }
}

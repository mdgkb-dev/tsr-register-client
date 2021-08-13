import Edv from '@/classes/disability/Edv';
import Period from '@/classes/shared/Period';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IPatient from '@/interfaces/patients/IPatient';
import IPeriod from '@/interfaces/shared/IPeriod';

export default class Disability implements IDisability {
  id?: string;
  period?: IPeriod = new Period();
  patient?: IPatient;
  patientId?: string;
  edvs: IEdv[] = [];

  constructor(disability?: IDisability) {
    if (!disability) {
      return;
    }
    this.id = disability.id;
    if (disability.period) this.period = new Period(disability.period);
    this.patientId = disability.patientId;
    this.patient = disability.patient;
    if (disability.edvs) this.edvs = disability.edvs.map((e) => new Edv(e));
  }

  getActuallyEdv(): IEdv {
    return this.edvs[this.edvs.length - 1];
  }
}

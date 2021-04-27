import IDisability from '@/interfaces/disabilities/IDisability';
import IPeriod from '@/interfaces/shared/IPeriod';
import IPatient from '@/interfaces/patients/IPatient';
import IEdv from '@/interfaces/disabilities/IEdv';
import Period from '@/classes/shared/Period';

export default class Edv implements IEdv {
  id?: string;
  period?: IPeriod;
  disabilityId: string;
  parameter1?: boolean;
  parameter2?: boolean;
  parameter3?: boolean;

  constructor() {
    this.period = new Period();
    this.disabilityId = '';
    this.parameter1 = false;
    this.parameter2 = false;
    this.parameter3 = false;
  }
}

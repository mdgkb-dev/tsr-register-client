import IPeriod from '@/interfaces/shared/IPeriod';
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

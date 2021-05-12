import IPeriod from '@/interfaces/shared/IPeriod';
import IEdv from '@/interfaces/disabilities/IEdv';
import Period from '@/classes/shared/Period';

export default class Edv implements IEdv {
  id?: string;

  period?: IPeriod = new Period();

  disabilityId?: string;

  parameter1 = false;

  parameter2 = false;

  parameter3 = false;

  constructor(edv?: IEdv) {
    if (!edv) {
      return;
    }
    this.id = edv.id;
    this.period = edv.period;
    this.disabilityId = edv.disabilityId;
    this.parameter1 = edv.parameter1;
    this.parameter2 = edv.parameter2;
    this.parameter3 = edv.parameter3;
  }
}

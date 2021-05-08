import IPeriod from '@/interfaces/shared/IPeriod';

export default class Period implements IPeriod {
  dateStart?: '';

  dateEnd?: '';

  constructor() {
    this.dateStart = '';
    this.dateEnd = '';
  }
}

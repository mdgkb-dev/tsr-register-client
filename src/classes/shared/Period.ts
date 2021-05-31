import IPeriod from '@/interfaces/shared/IPeriod';

export default class Period implements IPeriod {
  dateStart?: '';

  dateEnd?: '';

  constructor() {
    this.dateStart = '';
    this.dateEnd = '';
  }

  dateStartLess() {
    if (!this.dateStart || !this.dateEnd) return false;
    return this.dateStart < this.dateEnd;
  }
}

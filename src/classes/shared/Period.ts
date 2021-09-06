import IPeriod from '@/interfaces/shared/IPeriod';

export default class Period implements IPeriod {
  id?: string;
  dateStart = '';
  dateEnd = '';

  constructor(i?: IPeriod) {
    if (!i) return;
    this.id = i.id;
    this.dateStart = i.dateStart;
    this.dateEnd = i.dateEnd;
  }
}

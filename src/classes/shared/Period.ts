import IPeriod from '@/interfaces/shared/IPeriod';

export default class Period implements IPeriod {
  dateStart: string = '';
  dateEnd: string = '';

  constructor(period?: IPeriod) {
    if (!period) return;
    this.dateStart = period.dateStart;
    this.dateEnd = period.dateEnd;
  }

  static StartLessEnd(rule: any, value: any, callback: any): void {
    if (new Date(rule.options.dateStart) < new Date(rule.options.dateEnd)) {
      callback();
    } else {
      callback(new Error('Дата начала периода должна быть раньше даты конца периода'));
    }
  }
}

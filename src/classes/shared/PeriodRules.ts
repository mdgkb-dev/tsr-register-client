import Period from '@/classes/shared/Period';

export default class PeriodRules {
  dateStart = [{ validator: Period.StartLessEnd, trigger: 'blur', options: '' }];
  dateEnd = [{ validator: Period.StartLessEnd, trigger: 'blur', options: '' }];
}

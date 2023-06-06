import ClassHelper from '@/services/ClassHelper';

export default class CommissionStatus {
  id?: string;
  name = '';
  color = '';
  constructor(i?: CommissionStatus) {
    ClassHelper.BuildClass(this, i);
  }
}

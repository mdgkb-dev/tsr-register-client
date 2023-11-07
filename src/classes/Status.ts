import ClassHelper from '@/services/ClassHelper';

export default class Status {
  id?: string;
  name = '';
  color = '';
  model = '';

  constructor(i?: Status) {
    ClassHelper.BuildClass(this, i);
  }
}

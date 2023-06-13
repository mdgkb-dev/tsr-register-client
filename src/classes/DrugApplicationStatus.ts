import ClassHelper from '@/services/ClassHelper';

export default class DrugApplicationStatus {
  id?: string;
  name = '';
  color = '';
  constructor(i?: DrugApplicationStatus) {
    ClassHelper.BuildClass(this, i);
  }
}

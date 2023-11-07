import ClassHelper from '@/services/ClassHelper';

export default class QuestionMeasure {
  id?: string;
  name = '';
  order = 0;

  constructor(i?: QuestionMeasure) {
    ClassHelper.BuildClass(this, i);
  }
}

import ClassHelper from '@/services/ClassHelper';

export default class AnswerVariant {
  id?: string;
  name = '';
  score = 0;
  order = 0;
  showMoreQuestions = false;

  constructor(i?: AnswerVariant) {
    ClassHelper.BuildClass(this, i);
  }
}

import ClassHelper from '@/services/ClassHelper';

export default class QuestionVariant {
  id?: string;
  name = '';
  questionId?: string;

  constructor(i?: QuestionVariant) {
    ClassHelper.BuildClass(this, i);
  }
}

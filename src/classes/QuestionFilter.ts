import ClassHelper from '@/services/ClassHelper';

export default class QuestionFilter {
  id?: string;
  questionId?: string;

  constructor(i?: QuestionFilter) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'questionFilter';
  }
}

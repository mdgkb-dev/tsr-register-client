import ClassHelper from '@/services/ClassHelper';

export default class AnswerVariant {
  id?: string;
  name = '';
  score = 0;
  order = 0;
  showMoreQuestions = false;

  questionId?: string;

  constructor(i?: AnswerVariant) {
    ClassHelper.BuildClass(this, i);
  }
  static Create(quesionId?: string): AnswerVariant {
    const item = new AnswerVariant();
    item.id = ClassHelper.CreateUUID();
    item.questionId = quesionId;
    return item;
  }
}

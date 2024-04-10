import ClassHelper from '@/services/ClassHelper';

export default class QuestionVariant {
  id?: string;
  name = '';
  questionId?: string;

  constructor(i?: QuestionVariant) {
    ClassHelper.BuildClass(this, i);
  }
  static Create(questionId?: string): QuestionVariant {
    const item = new QuestionVariant();
    item.id = ClassHelper.CreateUUID();
    item.questionId = questionId;
    return item;
  }
}

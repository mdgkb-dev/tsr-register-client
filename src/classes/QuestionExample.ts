import Question from '@/classes/Question';
import ClassHelper from '@/services/ClassHelper';

export default class QuestionExample {
  id?: string;
  name = '';
  order = 0;
  questionId?: string;
  question: Question = new Question();

  constructor(i?: QuestionExample) {
    ClassHelper.BuildClass(this, i);
  }
}

import Question from '@/classes/Question';
import ClassHelper from '@/services/ClassHelper';

export default class Domain {
  id?: string;
  name = '';

  @ClassHelper.GetClassConstructor(Question)
  questions: Question[] = [];

  constructor(i?: Question) {
    ClassHelper.BuildClass(this, i);
  }
}

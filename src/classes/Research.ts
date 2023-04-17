import Formula from '@/classes/Formula';
import Question from '@/classes/Question';
import ClassHelper from '@/services/ClassHelper';

export default class Research {
  id?: string;
  name = '';
  order = 0;
  @ClassHelper.GetClassConstructor(Question)
  questions: Question[] = [];
  questionsForDelete: string[] = [];
  isEdit = false;
  withDates = false;

  @ClassHelper.GetClassConstructor(Formula)
  formulas: Formula[] = [];
  formulasForDelete: string[] = [];

  constructor(i?: Research) {
    ClassHelper.BuildClass(this, i);
  }

  editRegisterGroup(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  addQuestion(item?: Question): void {
    const newItem = new Question(item);
    newItem.order = this.questions.length;
    this.questions.push(newItem);
  }

  removeRegisterProperty(index: number): void {
    const idForDelete = this.questions[index].id;
    if (idForDelete) {
      this.questionsForDelete.push(idForDelete);
    }
    this.questions.splice(index, 1);
  }

  sortProperties(): void {
    this.questions.forEach((item: Question, index: number) => (item.order = index));
  }
}

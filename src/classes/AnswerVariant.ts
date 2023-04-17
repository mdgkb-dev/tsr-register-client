import Question from '@/classes/Question';
import ClassHelper from '@/services/ClassHelper';

export default class AnswerVariant {
  id?: string;
  name = '';
  questionId?: string;
  question?: Question;
  score = 0;
  // @ClassHelper.GetClassConstructor(RegisterPropertyOther)
  // registerPropertyOthers: RegisterPropertyOther[] = [];
  // registerPropertyOthersForDelete: string[] = [];
  order = 0;
  constructor(i?: AnswerVariant) {
    ClassHelper.BuildClass(this, i);
  }

  addRegisterPropertyOther(): void {
    // this.registerPropertyOthers.push(new RegisterPropertyOther());
  }

  removeRegisterPropertyOther(index: number): void {
    // const idForDelete = this.registerPropertyOthers[index].id;
    // if (idForDelete) {
    //   this.registerPropertyOthersForDelete.push(idForDelete);
    // }
    // this.registerPropertyOthers.splice(index, 1);
  }
}

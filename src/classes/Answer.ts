import { v4 as uuidv4 } from 'uuid';

import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import SelectedAnswerVariant from '@/classes/SelectedAnswerVariant';
import ClassHelper from '@/services/ClassHelper';

export default class Answer {
  id?: string;
  valueString?: string;
  valueOther?: string;
  valueNumber?: number;
  valueDate?: Date;
  answerVariant?: AnswerVariant;
  answerVariantId?: string;
  order = 0;
  @ClassHelper.GetClassConstructor(SelectedAnswerVariant)
  selectedAnswerVariants: SelectedAnswerVariant[] = [];
  selectedAnswerVariantsForDelete: string[] = [];
  patientId?: string;
  questionId?: string;
  filled = false;

  // researchResult?: ResearchResult;
  researchResultId?: string;

  // questionVariant = new QuestionVariant();
  // questionVariantId?: string;

  // questionMeasure = new QuestionMeasure();
  // questionMeasureId?: string;
  // @ClassHelper.GetClassConstructor(RegisterPropertyToPatientToFile)
  // registerPropertiesToPatientsToFileInfos: RegisterPropertyToPatientToFile[] = [];
  // registerPropertiesToPatientsToFileInfosForDelete: string[] = [];

  constructor(i?: Answer) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(question: Question): Answer {
    const item = new Answer();
    item.id = uuidv4();
    item.questionId = question.id;
    item.order = question.order;
    item.valueNumber = 0;
    item.valueString = '';
    item.valueDate = new Date();
    return item;
  }

  static CreateMany(questions: Question[]): Answer[] {
    return questions.map((q: Question) => Answer.Create(q));
  }

  // addPropertyToFile(): void {
  //   const f = new RegisterPropertyToPatientToFile();
  //   f.id = uuidv4();
  //   this.registerPropertiesToPatientsToFileInfos.push(f);
  // }

  getSelectedAnswerVariant(answerVariantId?: string): boolean {
    // if (registerPropWithDateId) {
    //   return this.registerPropertySetToPatient?.some(
    //     (i: RegisterPropertySetToPatient) => i.registerPropertySetId === setId && i.propWithDateId === registerPropWithDateId
    //   );
    // }
    return this.selectedAnswerVariants?.some((i: SelectedAnswerVariant) => i.answerVariantId === answerVariantId);
  }

  setSelectedAnswerVariant(selected: boolean, answerVariantId?: string): void {
    if (selected) {
      const item = SelectedAnswerVariant.Create(this.id, answerVariantId);
      // if (registerPropWithDateId) {
      //   registerPropertySetToPatient.propWithDateId = registerPropWithDateId;
      // }
      this.selectedAnswerVariants.push(item);
      return;
    }
    const findedIndex = this.selectedAnswerVariants.findIndex((v: SelectedAnswerVariant) => v.answerVariantId === answerVariantId);
    ClassHelper.RemoveFromClassByIndex(findedIndex, this.selectedAnswerVariants, this.selectedAnswerVariantsForDelete);
  }
}

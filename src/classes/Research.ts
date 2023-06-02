import AnswerVariant from '@/classes/AnswerVariant';
import Formula from '@/classes/Formula';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import ClassHelper from '@/services/ClassHelper';
import StringsService from '@/services/Strings';

export default class Research {
  id?: string;
  name = '';
  order = 0;
  @ClassHelper.GetClassConstructor(Question)
  questions: Question[] = [];
  questionsForDelete: string[] = [];
  isEdit = false;
  withDates = false;
  withScores = false;
  showOnlyNotFilled = false;
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

  getAnswers(result: ResearchResult): { [key: string]: number } {
    const results: { [key: string]: number } = {};
    this.questions.forEach((q: Question) => {
      results[q.code] = result.getOrCreateAnswer(q).valueNumber ?? 0;
    });
    return results;
  }

  getAnswerVariants(): AnswerVariant[] {
    const a: AnswerVariant[] = [];
    this.questions.forEach((q: Question) => a.push(...q.answerVariants));
    return a;
  }

  getNotFilledQuestions(researchResult: ResearchResult, showOnlyNotFilled: boolean, questions: Question[]): Question[] {
    return showOnlyNotFilled ? questions.filter((q: Question) => !researchResult.getAnswer(q.id as string)?.filled) : questions;
  }

  getQuestionsByString(filterString: string): Question[] {
    return filterString === ''
      ? this.questions
      : this.questions.filter((q: Question) => StringsService.stringsEquals(filterString, q.name));
  }

  getFilteredQuestions(filterString: string, showOnlyNotFilled: boolean, researchResult: ResearchResult): Question[] {
    return this.getNotFilledQuestions(researchResult, showOnlyNotFilled, this.getQuestionsByString(filterString));
  }
}

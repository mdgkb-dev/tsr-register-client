import AnswerVariant from '@/classes/AnswerVariant';
import ChartData from '@/classes/chartData/ChartData';
import ChartDataSet from '@/classes/chartData/ChartDataSet';
import Formula from '@/classes/Formula';
import Question from '@/classes/Question';
import ResearchResult from '@/classes/ResearchResult';
import ClassHelper from '@/services/ClassHelper';
import DateTimeFormat from '@/services/DateFormat';
import Strings from '@/services/Strings';

export default class Research {
  id?: string;
  name = '';
  order = 0;
  isLaboratory = false;
  @ClassHelper.GetClassConstructor(Question)
  questions: Question[] = [];
  questionsForDelete: string[] = [];
  isEdit = false;
  withDates = false;
  withScores = false;
  @ClassHelper.GetClassConstructor(Formula)
  formulas: Formula[] = [];
  formulasForDelete: string[] = [];
  //
  selectedFormula?: Formula;
  selectedForExport = false;
  filterString = '';
  showOnlyNotFilled = false;
  showOnlyFilled = false;
  //
  date = '';
  constructor(i?: Research) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'research';
  }

  static Create(): Research {
    const item = new Research();
    item.id = ClassHelper.CreateUUID();
    return item;
  }

  editRegisterGroup(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  addQuestion(): Question {
    const item = new Question();
    item.order = this.questions.length;
    this.questions.push(item);
    item.researchId = this.id;
    return item;
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

  getNotFilledQuestions(researchResult: ResearchResult, questions: Question[]): Question[] {
    return this.showOnlyNotFilled ? questions.filter((q: Question) => !researchResult.getAnswer(q.id as string)?.filled) : questions;
  }

  getFilledQuestions(researchResult: ResearchResult, questions: Question[]): Question[] {
    return this.showOnlyFilled ? questions.filter((q: Question) => researchResult.getAnswer(q.id as string)?.filled) : questions;
  }

  getQuestionsByString(): Question[] {
    return this.filterString === ''
      ? this.questions
      : this.questions.filter((q: Question) => Strings.StringsEquals(this.filterString, q.name));
  }

  getFilteredQuestions(researchResult: ResearchResult): Question[] {
    return this.showOnlyNotFilled
      ? this.getNotFilledQuestions(researchResult, this.getQuestionsByString())
      : this.getFilledQuestions(researchResult, this.getQuestionsByString());
  }

  selectFormula(item: Formula): void {
    this.selectedFormula = item;
  }

  getChartDataSets(researchResults: ResearchResult[], dateBirth: Date, isMale: boolean): ChartData {
    const dateFormatter = new DateTimeFormat();
    const data = new ChartData();
    data.labels = researchResults.map((rr: ResearchResult) => dateFormatter.format(rr.date));

    if (this.withScores) {
      const dataSet = new ChartDataSet();
      dataSet.label = 'Баллы';
      researchResults.forEach((rr: ResearchResult) => {
        dataSet.data.push(rr.calculateScores(this.getAnswerVariants()));
        dataSet.results.push(rr.date.toString());
      });
      data.datasets.push(dataSet);
      return data;
    }

    this.formulas.forEach((f: Formula) => {
      const dataSet = new ChartDataSet();
      dataSet.label = f.name;
      dataSet.backgroundColor = f.color;
      researchResults.forEach((rr: ResearchResult) => {
        const res = f.getResult(rr.getQuestionsAnswersMap(this.questions), isMale, dateFormatter.getMonthsDiff(dateBirth, rr.date));
        if (res) {
          dataSet.results.push(res.result);
          dataSet.data.push(res.value);
        }
      });
      data.datasets.push(dataSet);
    });

    return data;
  }

  setQuestionsOrder(): void {
    this.questions.forEach((q: Question, i: number) => (q.order = i));
  }
}

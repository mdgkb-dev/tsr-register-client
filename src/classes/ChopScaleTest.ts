import ChopScaleQuestion from '@/classes/ChopScaleQuestion';
import ChopScaleQuestionScore from '@/classes/ChopScaleQuestionScore';
import ChopScaleTestResult from '@/classes/ChopScaleTestResult';
import ClassBuilder from '@/services/ClassBuilder';
import RemoveFromClass from '@/services/RemoveFromClass';
import Strings from '@/services/Strings';

export default class ChopScaleTest {
  id?: string;
  date = '';
  patientId?: string;
  @ClassBuilder.GetClassConstructorForArray(ChopScaleTestResult)
  chopScaleTestResults: ChopScaleTestResult[] = [];
  chopScaleTestResultsForDelete: string[] = [];

  constructor(i?: ChopScaleTest) {
    ClassBuilder.BuildPrimitives(this, i);
  }
  getResult(chopScaleScore: ChopScaleQuestionScore): string {
    const r = this.chopScaleTestResults.find((r: ChopScaleTestResult) => r.chopScaleQuestionScoreId === chopScaleScore.id);
    if (r) {
      return r.chopScaleQuestionScoreId!;
    }
    return '';
  }

  setResult(question: ChopScaleQuestion, chopScaleScore: ChopScaleQuestionScore): void {
    const findedIndex = this.chopScaleTestResults.findIndex((r: ChopScaleTestResult) => {
      return r.chopScaleQuestionScoreId === chopScaleScore.id || r.chopScaleQuestionScore?.chopScaleQuestionId === question.id;
    });
    if (findedIndex > -1 && this.chopScaleTestResults[findedIndex].chopScaleQuestionScoreId === chopScaleScore.id) {
      return;
    }
    if (findedIndex > -1 && this.chopScaleTestResults[findedIndex].chopScaleQuestionScore?.chopScaleQuestionId === chopScaleScore.chopScaleQuestionId) {
      RemoveFromClass(findedIndex, this.chopScaleTestResults, this.chopScaleTestResultsForDelete);
    }
    const r = new ChopScaleTestResult();
    r.chopScaleQuestionScoreId = chopScaleScore.id;
    r.chopScaleQuestionScore = new ChopScaleQuestionScore(chopScaleScore);
    r.chopScaleQuestionScore.chopScaleQuestionId = question.id;
    this.chopScaleTestResults.push(r);
  }

  getScoresSum(): number {
    let sum = 0;
    this.chopScaleTestResults.forEach((i: ChopScaleTestResult) => {
      if (i.chopScaleQuestionScore) {
        sum += i.chopScaleQuestionScore.score;
      }
    });
    return sum;
  }

  getFillingPercentage(questionsQuantity?: number): number {
    if (!questionsQuantity || questionsQuantity === 0) {
      questionsQuantity = 16; // defaultQuantityOfQuestions
    }
    return Math.round((this.chopScaleTestResults.length * 100) / questionsQuantity);
  }
// TODO
  // getFormattedScoresSum(): string {
  //   return Strings.BuildNameNumbersFromNumber(this.getScoresSum(), ['балл', 'балла', 'баллов']);
  // }

  questionResultExists(questionId: string): boolean {
    return this.chopScaleTestResults.some((r: ChopScaleTestResult) => {
      return r.chopScaleQuestionScore.chopScaleQuestionId == questionId;
    });
  }
}

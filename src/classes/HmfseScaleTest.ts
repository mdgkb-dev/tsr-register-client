import HmfseScaleQuestion from '@/classes/HmfseScaleQuestion';
import HmfseScaleQuestionScore from '@/classes/HmfseScaleQuestionScore';
import HmfseScaleTestResult from '@/classes/HmfseScaleTestResult';
import ClassBuilder from '@/services/ClassBuilder';
import RemoveFromClass from '@/services/RemoveFromClass';
import Strings from '@/services/Strings';

export default class HmfseScaleTest {
  id?: string;
  date = '';
  patientId?: string;
  @ClassBuilder.GetClassConstructorForArray(HmfseScaleTestResult)
  hmfseScaleTestResults: HmfseScaleTestResult[] = [];
  hmfseScaleTestResultsForDelete: string[] = [];

  constructor(i?: HmfseScaleTest) {
    ClassBuilder.BuildPrimitives(this, i);
  }
  getResult(hmfseScaleScore: HmfseScaleQuestionScore): string {
    const r = this.hmfseScaleTestResults.find((r: HmfseScaleTestResult) => r.hmfseScaleQuestionScoreId === hmfseScaleScore.id);
    if (r) {
      return r.hmfseScaleQuestionScoreId!;
    }
    return '';
  }

  setResult(question: HmfseScaleQuestion, hmfseScaleScore: HmfseScaleQuestionScore): void {
    const findedIndex = this.hmfseScaleTestResults.findIndex((r: HmfseScaleTestResult) => {
      return r.hmfseScaleQuestionScoreId === hmfseScaleScore.id || r.hmfseScaleQuestionScore?.hmfseScaleQuestionId === question.id;
    });
    if (findedIndex > -1 && this.hmfseScaleTestResults[findedIndex].hmfseScaleQuestionScoreId === hmfseScaleScore.id) {
      return;
    }
    if (findedIndex > -1 && this.hmfseScaleTestResults[findedIndex].hmfseScaleQuestionScore?.hmfseScaleQuestionId === hmfseScaleScore.hmfseScaleQuestionId) {
      RemoveFromClass(findedIndex, this.hmfseScaleTestResults, this.hmfseScaleTestResultsForDelete);
    }
    const r = new HmfseScaleTestResult();
    r.hmfseScaleQuestionScoreId = hmfseScaleScore.id;
    r.hmfseScaleQuestionScore = new HmfseScaleQuestionScore(hmfseScaleScore);
    r.hmfseScaleQuestionScore.hmfseScaleQuestionId = question.id;
    this.hmfseScaleTestResults.push(r);
  }

  getScoresSum(): number {
    let sum = 0;
    this.hmfseScaleTestResults.forEach((i: HmfseScaleTestResult) => {
      if (i.hmfseScaleQuestionScore) {
        sum += i.hmfseScaleQuestionScore.score;
      }
    });
    return sum;
  }

  getFillingPercentage(questionsQuantity?: number): number {
    if (!questionsQuantity || questionsQuantity === 0) {
      questionsQuantity = 33; // defaultQuantityOfQuestions
    }
    return Math.round((this.hmfseScaleTestResults.length * 100) / questionsQuantity);
  }
// TODO
  // getFormattedScoresSum(): string {
  //   return Strings.BuildNameNumbersFromNumber(this.getScoresSum(), ['балл', 'балла', 'баллов']);
  // }

  questionResultExists(questionId: string): boolean {
    return this.hmfseScaleTestResults.some((r: HmfseScaleTestResult) => {
      return r.hmfseScaleQuestionScore.hmfseScaleQuestionId == questionId;
    });
  }
}

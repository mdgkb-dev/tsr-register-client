import { v4 as uuidv4 } from 'uuid';

import Answer from '@/classes/Answer';
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import Research from '@/classes/Research';
import IFileInfo from '@/interfaces/files/IFileInfo';
import ClassHelper from '@/services/ClassHelper';

export default class ResearchResult {
  id?: string;
  date = new Date();
  editMode = false;
  patientResearchId?: string;
  fillingPercentage = 0;
  @ClassHelper.GetClassConstructor(Answer)
  answers: Answer[] = [];
  //
  changed = false;
  constructor(i?: ResearchResult) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(research: Research, patientResearchId?: string): ResearchResult {
    const item = new ResearchResult();
    item.id = uuidv4();
    item.patientResearchId = patientResearchId;
    item.answers.push(...Answer.CreateMany(research.questions));
    return item;
  }

  addAnswer(answer: Answer): void {
    this.answers.push(answer);
  }

  getAnswer(questionId: string): Answer | undefined {
    return this.answers?.find((i: Answer) => i.questionId === questionId);
  }

  pushRegisterProperty(propertyId: string): void {
    const registerPropertyToPatient = new Answer();
    registerPropertyToPatient.researchResultId = propertyId;
    this.answers.push(registerPropertyToPatient);
  }

  getRegisterPropertyToPatient(propertyId: string): Answer[] {
    return this.answers.filter((r: Answer) => r.researchResultId === propertyId);
  }

  getOrCreateAnswer(question: Question): Answer {
    let answer = this.getAnswer(question.id as string);
    if (!answer) {
      answer = Answer.Create(question);
      this.addAnswer(answer);
    }
    return answer;
  }

  getFileInfos(): IFileInfo[] {
    const fileInfos: IFileInfo[] = [];
    this.answers.forEach((i: Answer) => fileInfos.push(...i.getFileInfos()));
    return fileInfos;
  }

  calculateFilling(): void {
    const filledAnswers = this.answers.filter((a: Answer) => a.filled).length;
    const allAnswers = this.answers.length;
    this.fillingPercentage = Math.round((filledAnswers / allAnswers) * 100);
  }

  getAnswerByQuestionId(questionId: string): Answer | undefined {
    return this.answers.find((a: Answer) => a.questionId === questionId);
  }

  calculateScores(answerVariants: AnswerVariant[]): number {
    let sum = 0;
    this.answers.forEach((a: Answer) => {
      const selectedVariant = answerVariants.find((av: AnswerVariant) => av.id === a.answerVariantId);
      if (selectedVariant) {
        sum += selectedVariant.score;
      }
    });
    return sum;
  }

  getQuestionVariantAnswer(questionVariantId: string): Answer | undefined {
    return this.answers.find((a: Answer) => a.questionVariantId === questionVariantId);
  }

  getQuestionsAnswersMap(questions: Question[]): { [key: string]: number } {
    const map: { [key: string]: number } = {};
    questions.forEach((q: Question) => {
      if (q.code) {
        const answer = this.getAnswerByQuestionId(q.id as string)?.valueNumber as number;
        map[q.code] = answer;
      }
    });
    return map;
  }

  getIdWithoutDashes(): string {
    return this.id ? this.id.replaceAll(/[^a-zA-Z]+/g, '') : '';
  }
}

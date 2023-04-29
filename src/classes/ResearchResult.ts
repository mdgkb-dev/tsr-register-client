import { v4 as uuidv4 } from 'uuid';

import Answer from '@/classes/Answer';
import AnswerVariant from '@/classes/AnswerVariant';
import Question from '@/classes/Question';
import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class ResearchResult {
  id?: string;
  date = new Date();
  editMode = false;
  patientResearchId?: string;
  fillingPercentage = 0;
  @ClassHelper.GetClassConstructor(Answer)
  answers: Answer[] = [];

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
}

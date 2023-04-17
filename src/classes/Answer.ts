import AnswerVariant from '@/classes/AnswerVariant';
import ResearchResult from '@/classes/ResearchResult';
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

  registerPropertyId?: string;
  patientId?: string;

  filled = false;

  researchResult?: ResearchResult;
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
  // addPropertyToFile(): void {
  //   const f = new RegisterPropertyToPatientToFile();
  //   f.id = uuidv4();
  //   this.registerPropertiesToPatientsToFileInfos.push(f);
  // }
}

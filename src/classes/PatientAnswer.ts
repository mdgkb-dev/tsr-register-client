import AnswerVariants from '@/classes/Answer';
import ResearchResult from '@/classes/ResearchResult';
import ClassHelper from '@/services/ClassHelper';

export default class PatientAnswer {
  id?: string;
  propWithDateId?: string;
  answer?: AnswerVariants;
  answerId?: string;
  patientResearchSection?: ResearchResult;
  patientResearchSectionId?: string;

  constructor(i?: PatientAnswer) {
    ClassHelper.BuildClass(this, i);
  }
}

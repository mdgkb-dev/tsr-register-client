import MkbClassAnswer from '@/classes/mkb/MkbClassAnswer';
import MkbConcreteDiagnosisAnswer from '@/classes/mkb/MkbConcreteDiagnosisAnswer';
import MkbGroupAnswer from '@/classes/mkb/MkbGroupAnswer';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import MkbSubDiagnosisAnswer from '@/classes/mkb/MkbSubDiagnosisAnswer';
import MkbSubGroupAnswer from '@/classes/mkb/MkbSubGroupAnswer';
import MkbSubSubGroupAnswer from '@/classes/mkb/MkbSubSubGroupAnswer';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';

export default class MkbComposition {
  mkbClassAnswer = new MkbClassAnswer();
  mkbGroupAnswer: MkbGroupAnswer = new MkbGroupAnswer();
  mkbSubGroupAnswer: MkbSubGroupAnswer = new MkbSubGroupAnswer();
  mkbSubSubGroupAnswer: MkbSubSubGroupAnswer = new MkbSubSubGroupAnswer();
  mkbDiagnosis?: IMkbDiagnosis[];
  mkbSubDiagnosisAnswer: MkbSubDiagnosisAnswer = new MkbSubDiagnosisAnswer();
  mkbConcreteDiagnosisAnswer: MkbConcreteDiagnosisAnswer = new MkbConcreteDiagnosisAnswer();
  mkbIdSet: IMkbIdSet = new MkbIdSet();
}

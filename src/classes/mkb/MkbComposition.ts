import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import MkbClassAnswer from '@/classes/mkb/MkbClassAnswer';
import MkbGroupAnswer from '@/classes/mkb/MkbGroupAnswer';
import MkbSubGroupAnswer from '@/classes/mkb/MkbSubGroupAnswer';
import MkbSubSubGroupAnswer from '@/classes/mkb/MkbSubSubGroupAnswer';
import MkbSubDiagnosisAnswer from '@/classes/mkb/MkbSubDiagnosisAnswer';
import MkbIdSet from '@/classes/mkb/MkbIdSet';

export default class MkbComposition {
  mkbClassAnswer = new MkbClassAnswer();
  mkbGroupAnswer: MkbGroupAnswer = new MkbGroupAnswer();
  mkbSubGroupAnswer: MkbSubGroupAnswer = new MkbSubGroupAnswer();
  mkbSubSubGroupAnswer: MkbSubSubGroupAnswer = new MkbSubSubGroupAnswer();
  mkbDiagnosis?: IMkbDiagnosis[];
  mkbSubDiagnosisAnswer: MkbSubDiagnosisAnswer = new MkbSubDiagnosisAnswer();
  mkbIdSet: IMkbIdSet = new MkbIdSet();
}

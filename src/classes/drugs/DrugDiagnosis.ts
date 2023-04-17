import Drug from '@/classes/drugs/Drug';
import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import ClassHelper from '@/services/ClassHelper';

export default class DrugDiagnosis {
  id?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: MkbSubDiagnosis = new MkbSubDiagnosis();
  mkbDiagnosisId?: string;
  mkbDiagnosis: MkbDiagnosis = new MkbDiagnosis();
  drugId?: string;
  drug?: Drug;
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: MkbConcreteDiagnosis = new MkbConcreteDiagnosis();

  constructor(i?: DrugDiagnosis) {
    ClassHelper.BuildClass(this, i);
  }
}

import IDrug from '@/interfaces/drugs/IDrug';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default interface IDrugDiagnosis {
  id?: string;
  drugId?: string;
  drug?: IDrug;

  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis;
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis;
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis;
}

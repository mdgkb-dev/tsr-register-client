import Drug from '@/classes/drugs/Drug';
import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugDiagnosis from '@/interfaces/drugs/IDrugDiagnosis';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';

export default class DrugDiagnosis implements IDrugDiagnosis {
  id?: string;
  mkbSubDiagnosisId?: string;
  mkbSubDiagnosis: IMkbSubDiagnosis = new MkbSubDiagnosis();
  mkbDiagnosisId?: string;
  mkbDiagnosis: IMkbDiagnosis = new MkbDiagnosis();
  drugId?: string;
  drug?: IDrug;
  mkbConcreteDiagnosisId?: string;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosis = new MkbConcreteDiagnosis();

  constructor(i?: DrugDiagnosis) {
    if (!i) return;
    this.id = i.id;
    this.mkbDiagnosisId = i.mkbDiagnosisId;
    if (i.mkbDiagnosis) this.mkbDiagnosis = new MkbDiagnosis(i.mkbDiagnosis);
    this.mkbSubDiagnosisId = i.mkbSubDiagnosisId;
    if (i.mkbSubDiagnosis) this.mkbSubDiagnosis = new MkbSubDiagnosis(i.mkbSubDiagnosis);
    this.drugId = i.drugId;
    if (i.drug) {
      this.drug = new Drug(i.drug);
    }
    this.mkbConcreteDiagnosisId = i.mkbConcreteDiagnosisId;
    if (i.mkbConcreteDiagnosis) this.mkbConcreteDiagnosis = new MkbConcreteDiagnosis(i.mkbConcreteDiagnosis);
  }
}

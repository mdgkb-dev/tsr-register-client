import Drug from '@/classes/Drug';
import ClassHelper from '@/services/ClassHelper';

export default class DrugDiagnosis {
  id?: string;
  drugId?: string;
  drug?: Drug;

  constructor(i?: DrugDiagnosis) {
    ClassHelper.BuildClass(this, i);
  }
}

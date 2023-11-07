import DrugRegimen from '@/classes/DrugRegimen';
import ClassHelper from '@/services/ClassHelper';

export default class DrugNeeding {
  id?: string;
  calculation = '';
  measures = 0;
  packs = 0;
  weight = 0;
  ageInMonths = 0;
  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimen?: DrugRegimen;
  drugRegimenId?: string;

  commissionId?: string;

  constructor(i?: DrugNeeding) {
    ClassHelper.BuildClass(this, i);
  }
}

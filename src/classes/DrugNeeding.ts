import ClassHelper from '@/services/ClassHelper';

import DrugRegimen from './DrugRegimen';

export default class DrugNeeding {
  id?: string;
  calculation = 0;
  measures = 0;
  packs = 0;
  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimen?: DrugRegimen;
  drugRegimenId?: string;

  constructor(i?: DrugNeeding) {
    ClassHelper.BuildClass(this, i);
  }
}

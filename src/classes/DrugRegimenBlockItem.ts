import DrugRegimenBlock from '@/classes/DrugRegimenBlock';
import ClassHelper from '@/services/ClassHelper';

export default class DrugRegimenBlockItem {
  id?: string;
  daysCount = 1;
  timesPerDay?: number;
  orderItem = 0;

  drugRegimenBlockId?: string;
  drugRegimenBlock?: DrugRegimenBlock;

  constructor(i?: DrugRegimenBlockItem) {
    ClassHelper.BuildClass(this, i);
  }
}

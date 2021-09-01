import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';
import IDrugRegimenBlockItem from '@/interfaces/drugs/IDrugRegimenBlockItem';

import DrugRegimenBlock from './DrugRegimenBlock';

export default class DrugRegimenBlockItem implements IDrugRegimenBlockItem {
  id?: string;
  daysCount = 1;
  timesPerDay?: number;
  orderItem = 0;

  drugRegimenBlockId?: string;
  drugRegimenBlock?: IDrugRegimenBlock;

  constructor(drugRegimenBlockItem?: IDrugRegimenBlockItem) {
    if (!drugRegimenBlockItem) {
      return;
    }
    this.id = drugRegimenBlockItem.id;
    this.daysCount = drugRegimenBlockItem.daysCount;
    this.orderItem = drugRegimenBlockItem.orderItem;
    this.timesPerDay = drugRegimenBlockItem.timesPerDay;
    this.drugRegimenBlockId = drugRegimenBlockItem.drugRegimenBlockId;
    if (drugRegimenBlockItem.drugRegimenBlock) {
      this.drugRegimenBlock = new DrugRegimenBlock(drugRegimenBlockItem.drugRegimenBlock);
    }
  }
}

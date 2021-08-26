import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';
import IDrugRegimenBlockItem from '@/interfaces/drugs/IDrugRegimenBlockItem';

import DrugRegimenBlock from './DrugRegimenBlock';

export default class DrugRegimenBlockItem implements IDrugRegimenBlockItem {
  id?: string;
  daysCount = 1;
  orderItem = 0;

  drugRegimenBlockId?: string;
  drugRegimenBlock?: IDrugRegimenBlock;

  constructor(i?: IDrugRegimenBlockItem) {
    if (!i) return;
    this.id = i.id;
    this.daysCount = i.daysCount;
    this.orderItem = i.orderItem;
    this.drugRegimenBlockId = i.drugRegimenBlockId;
    this.drugRegimenBlock = new DrugRegimenBlock(i.drugRegimenBlock);
  }
}

import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';
import IDrugRegimenBlockItem from '@/interfaces/drugs/IDrugRegimenBlockItem';

import DrugRegimen from './DrugRegimen';
import DrugRegimenBlockItem from './DrugRegimenBlockItem';

export default class DrugRegimenBlock implements IDrugRegimenBlock {
  id?: string;
  infinitely = false;
  isEdit = false;
  orderItem = 0;

  drugRegimenId?: string;
  drugRegimen?: IDrugRegimen;

  drugRegimenBlockItems: IDrugRegimenBlockItem[] = [];
  drugRegimenBlockItemsForDelete: string[] = [];

  constructor(i?: IDrugRegimenBlock) {
    if (!i) return;
    this.id = i.id;
    this.infinitely = i.infinitely;
    this.isEdit = i.isEdit;
    this.orderItem = i.orderItem;
    this.drugRegimenId = i.drugRegimenId;
    this.drugRegimen = new DrugRegimen(i.drugRegimen);
    if (i.drugRegimenBlockItems) {
      this.drugRegimenBlockItems = i.drugRegimenBlockItems.map((item: IDrugRegimenBlockItem) => new DrugRegimenBlockItem(item));
    }
  }
}

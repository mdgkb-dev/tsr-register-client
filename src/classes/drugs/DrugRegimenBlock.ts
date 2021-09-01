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

  drugRegimenBlockItems: IDrugRegimenBlockItem[] = [new DrugRegimenBlockItem()];
  drugRegimenBlockItemsForDelete: string[] = [];

  constructor(drugRegimenBlock?: IDrugRegimenBlock) {
    if (!drugRegimenBlock) {
      return;
    }
    this.id = drugRegimenBlock.id;
    this.infinitely = drugRegimenBlock.infinitely;
    this.isEdit = drugRegimenBlock.isEdit;
    this.orderItem = drugRegimenBlock.orderItem;
    this.drugRegimenId = drugRegimenBlock.drugRegimenId;
    if (drugRegimenBlock.drugRegimen) {
      this.drugRegimen = new DrugRegimen(drugRegimenBlock.drugRegimen);
    }
    if (drugRegimenBlock.drugRegimenBlockItems) {
      this.drugRegimenBlockItems = drugRegimenBlock.drugRegimenBlockItems.map(
        (item: IDrugRegimenBlockItem) => new DrugRegimenBlockItem(item)
      );
    }
  }
}

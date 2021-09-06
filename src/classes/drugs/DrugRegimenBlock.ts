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

  addDrugRegimenBlockItem(): void {
    this.drugRegimenBlockItems.push(new DrugRegimenBlockItem());
  }
  removeDrugRegimenBlockItem(index: number): void {
    const itemId = this.drugRegimenBlockItems[index].id;
    if (itemId) {
      this.drugRegimenBlockItemsForDelete.push(itemId);
    }
    this.drugRegimenBlockItems.splice(index, 1);
  }
  moveDrugRegimenBlockItemUp(index: number): void {
    const elementToMove = this.drugRegimenBlockItems[index];
    this.drugRegimenBlockItems[index] = this.drugRegimenBlockItems[index - 1];
    this.drugRegimenBlockItems[index - 1] = elementToMove;
  }
  moveDrugRegimenBlockItemDown(index: number): void {
    const elementToMove = this.drugRegimenBlockItems[index];
    this.drugRegimenBlockItems[index] = this.drugRegimenBlockItems[index + 1];
    this.drugRegimenBlockItems[index + 1] = elementToMove;
  }
  editDrugRegimenBlock(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }
}

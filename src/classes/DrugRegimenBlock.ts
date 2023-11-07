import ClassHelper from '@/services/ClassHelper';

import DrugRegimen from './DrugRegimen';
import DrugRegimenBlockItem from './DrugRegimenBlockItem';

export default class DrugRegimenBlock {
  id?: string;
  infinitely = false;
  isEdit = false;
  orderItem = 0;

  drugRegimenId?: string;
  drugRegimen?: DrugRegimen;

  drugRegimenBlockItems: DrugRegimenBlockItem[] = [new DrugRegimenBlockItem()];
  drugRegimenBlockItemsForDelete: string[] = [];

  constructor(i?: DrugRegimenBlock) {
    ClassHelper.BuildClass(this, i);
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

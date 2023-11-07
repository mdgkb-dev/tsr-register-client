import DrugRegimenBlockItem from '@/classes/DrugRegimenBlockItem';
import ClassHelper from '@/services/ClassHelper';

import Drug from './Drug';
import DrugDoze from './DrugDoze';
import DrugRegimenBlock from './DrugRegimenBlock';

export default class DrugRegimen {
  id?: string;
  name = '';
  isEdit = false;

  drugId?: string;
  drug?: Drug;

  drugDozeId?: string;
  drugDoze: DrugDoze = new DrugDoze();

  drugRegimenBlocks: DrugRegimenBlock[] = [new DrugRegimenBlock()];
  drugRegimenBlocksForDelete: string[] = [];

  constructor(i?: DrugRegimen) {
    ClassHelper.BuildClass(this, i);
  }

  addDrugRegimenBlock(): void {
    this.drugRegimenBlocks.push(new DrugRegimenBlock());
  }

  removeDrugRegimenBlock(index: number): void {
    const itemId = this.drugRegimenBlocks[index].id;
    if (itemId) {
      this.drugRegimenBlocksForDelete.push(itemId);
    }
    this.drugRegimenBlocks.splice(index, 1);
  }

  moveDrugRegimenBlockUp(index: number): void {
    const elementToMove = this.drugRegimenBlocks[index];
    if (elementToMove.infinitely) {
      elementToMove.infinitely = false;
    }
    this.drugRegimenBlocks[index] = this.drugRegimenBlocks[index - 1];
    this.drugRegimenBlocks[index - 1] = elementToMove;
  }

  moveDrugRegimenBlockDown(index: number): void {
    const elementToMove = this.drugRegimenBlocks[index];
    this.drugRegimenBlocks[index] = this.drugRegimenBlocks[index + 1];
    this.drugRegimenBlocks[index + 1] = elementToMove;
  }

  editDrugRegimen(isEdit?: boolean): void {
    this.isEdit = isEdit ?? !this.isEdit;
  }

  getShortInfo(): string {
    let result = '';
    this.drugRegimenBlocks.forEach((drugRegimenBlock: DrugRegimenBlock, drugRegimenBlockIndex: number) => {
      drugRegimenBlock.drugRegimenBlockItems.forEach((drugRegimenBlockItem: DrugRegimenBlockItem, drugRegimenBlockItemIndex: number) => {
        if (drugRegimenBlockItemIndex === 0) {
          result += `${drugRegimenBlockIndex + 1}-й промежуток: `;
        }
        if (!drugRegimenBlockItem.timesPerDay) {
          result += '1 раз в ';
        } else {
          result += `${drugRegimenBlockItem.timesPerDay} в день `;
        }
        result += `${drugRegimenBlockItem.daysCount}дн`;
        if (drugRegimenBlock.infinitely && drugRegimenBlock.drugRegimenBlockItems.length - 1 === drugRegimenBlockItemIndex) {
          result += ' до конца.';
        } else if (this.drugRegimenBlocks.length - 1 === drugRegimenBlockIndex && drugRegimenBlock.drugRegimenBlockItems.length - 1 === drugRegimenBlockItemIndex) {
          result += '. ';
        } else if (drugRegimenBlock.drugRegimenBlockItems.length - 1 === drugRegimenBlockItemIndex) {
          result += '; ';
        } else {
          result += ', ';
        }
      });
    });
    return result;
  }
}

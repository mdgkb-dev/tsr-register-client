import cloneDeep from 'lodash/cloneDeep';

import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';
import IDrugRegimenBlockItem from '@/interfaces/drugs/IDrugRegimenBlockItem';

import Drug from './Drug';
import DrugRegimenBlock from './DrugRegimenBlock';

export default class DrugRegimen implements IDrugRegimen {
  id?: string;
  name = '';
  isEdit = false;

  drugId?: string;
  drug?: IDrug;

  drugRegimenBlocks: IDrugRegimenBlock[] = [new DrugRegimenBlock()];
  drugRegimenBlocksForDelete: string[] = [];

  constructor(drugRegimen?: IDrugRegimen) {
    if (!drugRegimen) {
      return;
    }
    this.id = drugRegimen.id;
    this.name = drugRegimen.name;
    this.isEdit = drugRegimen.isEdit;
    this.drugId = drugRegimen.drugId;
    if (drugRegimen.drug) {
      this.drug = new Drug(drugRegimen.drug);
    }
    if (drugRegimen.drugRegimenBlocks) {
      this.drugRegimenBlocks = drugRegimen.drugRegimenBlocks.map((item: IDrugRegimenBlock) => new DrugRegimenBlock(item));
    }
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
  copyDrugRegimenBlock(index: number): void {
    this.drugRegimenBlocks.splice(index + 1, 0, cloneDeep(this.drugRegimenBlocks[index]));
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
    this.drugRegimenBlocks.forEach((drugRegimenBlock: IDrugRegimenBlock, drugRegimenBlockIndex: number) => {
      drugRegimenBlock.drugRegimenBlockItems.forEach((drugRegimenBlockItem: IDrugRegimenBlockItem, drugRegimenBlockItemIndex: number) => {
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
        } else if (
          this.drugRegimenBlocks.length - 1 === drugRegimenBlockIndex &&
          drugRegimenBlock.drugRegimenBlockItems.length - 1 === drugRegimenBlockItemIndex
        ) {
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

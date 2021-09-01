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

import IDrugIndexes from '../../interfaces/drugs/IDrugIndexes';

export default class DrugIndexes implements IDrugIndexes {
  drugRegimenIndex?: number;
  drugRegimenBlockIndex?: number;
  drugRegimenBlockItemIndex?: number;

  constructor(drugIndexes?: IDrugIndexes) {
    if (!drugIndexes) {
      return;
    }
    this.drugRegimenIndex = drugIndexes.drugRegimenIndex;
    this.drugRegimenBlockIndex = drugIndexes.drugRegimenBlockIndex;
    this.drugRegimenBlockItemIndex = drugIndexes.drugRegimenBlockItemIndex;
  }
}

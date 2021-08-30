import IDrugIndexes from '../../interfaces/drugs/IDrugIndexes';

export default class DrugIndexes implements IDrugIndexes {
  drugRegimenIndex?: number;
  drugRegimenBlockIndex?: number;
  drugRegimenBlockItemIndex?: number;

  constructor(i?: IDrugIndexes) {
    if (!i) return;
    this.drugRegimenIndex = i.drugRegimenIndex;
    this.drugRegimenBlockIndex = i.drugRegimenBlockIndex;
    this.drugRegimenBlockItemIndex = i.drugRegimenBlockItemIndex;
  }
}

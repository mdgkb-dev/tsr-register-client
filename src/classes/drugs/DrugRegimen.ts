import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';

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

  constructor(i?: IDrugRegimen) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    this.isEdit = i.isEdit;
    this.drugId = i.drugId;
    this.drug = new Drug(i.drug);
    if (i.drugRegimenBlocks) {
      this.drugRegimenBlocks = i.drugRegimenBlocks.map((item: IDrugRegimenBlock) => new DrugRegimenBlock(item));
    }
  }
}

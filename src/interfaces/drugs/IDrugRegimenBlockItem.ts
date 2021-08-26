import IDrugRegimenBlock from './IDrugRegimenBlock';

export default interface IDrugRegimenBlockItem {
  id?: string;
  daysCount: number;
  orderItem: number;

  drugRegimenBlockId?: string;
  drugRegimenBlock?: IDrugRegimenBlock;
}

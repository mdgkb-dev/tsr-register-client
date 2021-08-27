import IDrugRegimenBlock from './IDrugRegimenBlock';

export default interface IDrugRegimenBlockItem {
  id?: string;
  daysCount: number;
  timesPerDay?: number;
  orderItem: number;
  drugRegimenBlockId?: string;

  drugRegimenBlock?: IDrugRegimenBlock;
}

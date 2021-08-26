import IDrugRegimen from './IDrugRegimen';
import IDrugRegimenBlockItem from './IDrugRegimenBlockItem';

export default interface IDrugRegimenBlock {
  id?: string;
  infinitely: boolean;
  isEdit: boolean;
  orderItem: number;

  drugRegimenId?: string;
  drugRegimen?: IDrugRegimen;

  drugRegimenBlockItems: IDrugRegimenBlockItem[];
  drugRegimenBlockItemsForDelete: string[];
}

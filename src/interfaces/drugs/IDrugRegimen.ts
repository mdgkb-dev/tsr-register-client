import IDrug from './IDrug';
import IDrugRegimenBlock from './IDrugRegimenBlock';

export default interface IDrugRegimen {
  id?: string;
  name: string;
  isEdit: boolean;
  drugId?: string;

  drug?: IDrug;
  drugRegimenBlocks: IDrugRegimenBlock[];
  drugRegimenBlocksForDelete: string[];
}

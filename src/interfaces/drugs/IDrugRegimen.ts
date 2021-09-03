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

  addDrugRegimenBlock: () => void;
  removeDrugRegimenBlock: (index: number) => void;
  copyDrugRegimenBlock: (index: number) => void;
  moveDrugRegimenBlockUp: (index: number) => void;
  moveDrugRegimenBlockDown: (index: number) => void;
  editDrugRegimen: (isEdit?: boolean) => void;
}

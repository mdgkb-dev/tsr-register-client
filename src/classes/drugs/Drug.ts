import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';

import DrugRegimen from './DrugRegimen';

export default class Drug implements IDrug {
  id?: string;
  name = '';

  drugRegimens: IDrugRegimen[] = [];
  drugRegimensForDelete: string[] = [];

  constructor(drug?: IDrug) {
    if (!drug) {
      return;
    }
    this.id = drug.id;
    this.name = drug.name;
    if (drug.drugRegimens) {
      this.drugRegimens = drug.drugRegimens.map((item: IDrugRegimen) => new DrugRegimen(item));
    }
  }
}

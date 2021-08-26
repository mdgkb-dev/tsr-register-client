import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';

import DrugRegimen from './DrugRegimen';

export default class Drug implements IDrug {
  id?: string;
  name = '';

  drugRegimens: IDrugRegimen[] = [];
  drugRegimensForDelete: string[] = [];

  constructor(i?: IDrug) {
    if (!i) return;
    this.id = i.id;
    this.name = i.name;
    if (i.drugRegimens) {
      this.drugRegimens = i.drugRegimens.map((item: IDrugRegimen) => new DrugRegimen(item));
    }
  }
}

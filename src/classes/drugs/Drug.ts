import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';

import DrugRegimen from './DrugRegimen';
import IDrugDiagnosis from '@/interfaces/drugs/IDrugDiagnosis';
import DrugDiagnosis from '@/classes/drugs/DrugDiagnosis';

export default class Drug implements IDrug {
  id?: string;
  name = '';

  drugRegimens: IDrugRegimen[] = [];
  drugRegimensForDelete: string[] = [];

  drugsDiagnosis: IDrugDiagnosis[] = [];
  drugsDiagnosisForDelete: string[] = [];

  constructor(drug?: IDrug) {
    if (!drug) {
      return;
    }
    this.id = drug.id;
    this.name = drug.name;
    if (drug.drugRegimens) {
      this.drugRegimens = drug.drugRegimens.map((item: IDrugRegimen) => new DrugRegimen(item));
    }
    if (drug.drugsDiagnosis) {
      this.drugsDiagnosis = drug.drugsDiagnosis.map((item: IDrugDiagnosis) => new DrugDiagnosis(item));
    }
  }

  addDrugRegimen(item: IDrugRegimen): void {
    this.drugRegimens.push(item);
  }
  removeDrugRegimen(index: number): void {
    const itemId = this.drugRegimens[index].id;
    if (itemId) {
      this.drugRegimensForDelete.push(itemId);
    }
    this.drugRegimens.splice(index, 1);
  }
}

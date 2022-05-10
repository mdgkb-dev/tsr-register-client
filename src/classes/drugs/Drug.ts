import DrugDiagnosis from '@/classes/drugs/DrugDiagnosis';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugDiagnosis from '@/interfaces/drugs/IDrugDiagnosis';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';

import DrugRegimen from './DrugRegimen';

export default class Drug implements IDrug {
  id?: string;
  name = '';
  nameMNN = '';
  form = '';
  doze = '';
  registered = false;
  // dateRegistration?: Date;
  drugRegimens: IDrugRegimen[] = [];
  drugRegimensForDelete: string[] = [];

  drugsDiagnosis: IDrugDiagnosis[] = [];
  drugsDiagnosisForDelete: string[] = [];

  constructor(i?: IDrug) {
    if (!i) {
      return;
    }
    this.id = i.id;
    this.name = i.name;
    this.nameMNN = i.nameMNN;
    this.form = i.form;
    this.doze = i.doze;
    this.registered = i.registered;
    // this.dateRegistration = i.dateRegistration;
    if (i.drugRegimens) {
      this.drugRegimens = i.drugRegimens.map((item: IDrugRegimen) => new DrugRegimen(item));
    }
    if (i.drugsDiagnosis) {
      this.drugsDiagnosis = i.drugsDiagnosis.map((item: IDrugDiagnosis) => new DrugDiagnosis(item));
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

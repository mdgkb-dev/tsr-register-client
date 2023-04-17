import DrugDiagnosis from '@/classes/drugs/DrugDiagnosis';
import ClassHelper from '@/services/ClassHelper';

import DrugRegimen from './DrugRegimen';

export default class Drug {
  id?: string;
  name = '';
  nameMNN = '';
  form = '';
  doze = '';
  // dateRegistration: Date | undefined = undefined;
  registered = false;
  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimens: DrugRegimen[] = [];
  drugRegimensForDelete: string[] = [];
  @ClassHelper.GetClassConstructor(DrugDiagnosis)
  drugsDiagnosis: DrugDiagnosis[] = [];
  drugsDiagnosisForDelete: string[] = [];

  constructor(i?: Drug) {
    ClassHelper.BuildClass(this, i);
  }

  addDrugRegimen(item: DrugRegimen): void {
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

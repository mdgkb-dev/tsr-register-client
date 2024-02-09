import DrugDiagnosis from '@/classes/DrugDiagnosis';
import DrugForm from '@/classes/DrugForm';
import ClassHelper from '@/services/ClassHelper';

import DrugRegimen from './DrugRegimen';

export default class Drug {
  id?: string;
  name = '';
  nameINN = '';

  @ClassHelper.GetClassConstructor(DrugForm)
  drugForms: DrugForm[] = [];

  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimens: DrugRegimen[] = [];

  @ClassHelper.GetClassConstructor(DrugDiagnosis)
  drugsDiagnosis: DrugDiagnosis[] = [];
  drugsDiagnosisForDelete: string[] = [];

  constructor(i?: Drug) {
    ClassHelper.BuildClass(this, i);
  }

  addDrugRegimen(item: DrugRegimen): void {
    this.drugRegimens.push(item);
  }

  getName(): string {
    return this.nameINN;
  }
  static GetClassName(): string {
    return 'drug';
  }
}

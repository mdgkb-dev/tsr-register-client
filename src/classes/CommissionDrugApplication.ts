import Commission from '@/classes/Commission';
// import DrugApplication from '@/classes/DrugApplication';
import ClassHelper from '@/services/ClassHelper';

export default class CommissionDrugApplication {
  id?: string;

  @ClassHelper.GetClassConstructor(Commission)
  commission?: Commission;
  commissionId?: string;

  // @ClassHelper.GetClassConstructor(DrugApplication)
  // drugApplication?: DrugApplication;
  // drugApplicationId?: string;

  constructor(i?: CommissionDrugApplication) {
    ClassHelper.BuildClass(this, i);
  }
}

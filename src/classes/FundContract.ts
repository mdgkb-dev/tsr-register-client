import DrugApplication from '@/classes/DrugApplication';
import ClassHelper from '@/services/ClassHelper';

export default class FundContract {
  id?: string;
  @ClassHelper.GetClassConstructor(DrugApplication)
  drugApplications: DrugApplication[] = [];

  constructor(i?: FundContract) {
    ClassHelper.BuildClass(this, i);
  }
}

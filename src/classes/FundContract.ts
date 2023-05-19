import Drug from '@/classes/Drug';
import DrugArrive from '@/classes/DrugArrive';
import ClassHelper from '@/services/ClassHelper';

export default class FundContract {
  id?: string;
  // @ClassHelper.GetClassConstructor(Commission)
  // commissions: Commission[] = [];
  date = new Date();
  number = '';
  @ClassHelper.GetClassConstructor(DrugArrive)
  drugArrives: DrugArrive[] = [];

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;
  constructor(i?: FundContract) {
    ClassHelper.BuildClass(this, i);
  }

  addDrugArrive(): DrugArrive {
    const item = DrugArrive.Create(this);
    item.stage = this.drugArrives.length + 1;
    this.drugArrives.push(item);
    return item;
  }
}

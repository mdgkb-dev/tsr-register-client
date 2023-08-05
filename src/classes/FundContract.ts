import Drug from '@/classes/Drug';
import DrugArrive from '@/classes/DrugArrive';
import ClassHelper from '@/services/ClassHelper';
import sort from '@/services/sort';

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

  drugApplicationId?: string;

  constructor(i?: FundContract) {
    ClassHelper.BuildClass(this, i);
  }

  addDrugArrive(): DrugArrive {
    const item = DrugArrive.Create();
    item.stage = this.drugArrives.length + 1;
    item.fundContractId = this.id;
    this.drugArrives.push(item);
    return item;
  }
  normalizeArrivesStages(): void {
    sort(this.drugArrives);
    this.drugArrives.forEach((d: DrugArrive) => (d.stage = d.order));
  }
}

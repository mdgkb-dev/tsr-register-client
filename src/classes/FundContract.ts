import Drug from '@/classes/Drug';
import Arrays from '@/services/Arrays';
// import DrugArrive from '@/classes/DrugArrive';
import ClassHelper from '@/services/ClassHelper';

export default class FundContract {
  id?: string;
  // @ClassHelper.GetClassConstructor(Commission)
  // commissions: Commission[] = [];
  date = new Date();
  number = '';
  // @ClassHelper.GetClassConstructor(any)
  drugArrives: any[] = [];

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;

  drugApplicationId?: string;

  constructor(i?: FundContract) {
    ClassHelper.BuildClass(this, i);
  }

  addDrugArrive(): any {
    // const item = DrugArrive.Create();
    // item.stage = this.drugArrives.length + 1;
    // item.fundContractId = this.id;
    // this.drugArrives.push(item);
    // return item;
  }

  normalizeArrivesStages(): void {
    Arrays.Sort(this.drugArrives);
    // this.drugArrives.forEach((d: DrugArrive) => (d.stage = d.order));
  }
}

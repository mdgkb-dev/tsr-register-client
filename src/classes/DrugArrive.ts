import { v4 as uuidv4 } from 'uuid';

import Drug from '@/classes/Drug';
// import DrugDecrease from '@/classes/DrugDecrease';
import FundContract from '@/classes/FundContract';
import Status from '@/classes/Status';
import ClassHelper from '@/services/ClassHelper';

export default class DrugArrive {
  id?: string;
  @ClassHelper.GetClassConstructor(FundContract)
  fundContract?: FundContract;
  fundContractId?: string;

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;

  @ClassHelper.GetClassConstructor(Status)
  status?: Status;
  statusId?: string;

  date = new Date();
  arrived = false;
  quantity = 0;
  stage = 0;
  order = 0;

  // @ClassHelper.GetClassConstructor(DrugDecrease)
  // drugDecreases: DrugDecrease[] = [];

  constructor(i?: DrugArrive) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(): DrugArrive {
    const item = new DrugArrive();
    item.id = uuidv4();
    return item;
  }

  getSpended(): number {
    const spended = 0;
    // this.drugDecreases.forEach((d: DrugDecrease) => (spended += d.quantity));
    return spended;
  }

  getRemain(): number {
    return this.quantity - this.getSpended();
  }

  canSpend(): boolean {
    return this.getRemain() > 0;
  }

  addDrugDecrease(): any {
    // const item = new DrugDecrease();
    // item.id = uuidv4();
    // item.drugArriveId = this.id;
    // this.drugDecreases.push(item);
    // return item;
  }

  decrement(): boolean {
    if (!this.canSpend()) {
      return false;
    }
    this.quantity--;
    return true;
  }

  increment(): void {
    this.quantity++;
  }

  drugMove(cur: number, prev: number, drugDecrease: any): boolean {
    let succeedMove = true;
    if (cur > prev) {
      if (this.canSpend()) {
        drugDecrease.quantity++;
      } else {
        succeedMove = false;
      }
    } else if (cur < prev && drugDecrease.quantity > 0) {
      drugDecrease.quantity--;
    }
    return succeedMove;
  }

  setDate(newDate: Date): void {
    this.date = newDate;
  }
}

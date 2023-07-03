import { v4 as uuidv4 } from 'uuid';

import Drug from '@/classes/Drug';
import DrugDecrease from '@/classes/DrugDecrease';
import FundContract from '@/classes/FundContract';
import ClassHelper from '@/services/ClassHelper';

export default class DrugArrive {
  id?: string;
  @ClassHelper.GetClassConstructor(FundContract)
  fundContract?: FundContract;
  fundContractId?: string;

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;

  date = new Date();
  arrived = false;
  quantity = 0;
  stage = 0;
  order = 0;

  @ClassHelper.GetClassConstructor(DrugDecrease)
  drugDecreases: DrugDecrease[] = [];
  constructor(i?: DrugArrive) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(fundContract: FundContract): DrugArrive {
    const item = new DrugArrive();
    item.id = uuidv4();
    item.date = fundContract.date;
    item.drug = fundContract.drug;
    return item;
  }

  getSpended(): number {
    let spended = 0;
    this.drugDecreases.forEach((d: DrugDecrease) => (spended += d.quantity));
    return spended;
  }

  getRemain(): number {
    console.log(this.quantity, this.getSpended());
    return this.quantity - this.getSpended();
  }

  canSpend(): boolean {
    return this.getRemain() > 0;
  }

  addDrugDecrease(): DrugDecrease {
    const item = new DrugDecrease();
    item.id = uuidv4();
    item.drugArriveId = this.id;
    this.drugDecreases.push(item);
    return item;
  }

  setQuantity(cur: number, prev: number): boolean {
    if (cur > prev) {
      this.quantity++;
      return true;
    }
    if (this.canSpend()) {
      this.quantity--;
      return true;
    }
    return false;
  }

  drugMove(cur: number, prev: number, drugDecrease: DrugDecrease): boolean {
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

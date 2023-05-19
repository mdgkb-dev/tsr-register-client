import { v4 as uuidv4 } from 'uuid';

import Drug from '@/classes/Drug';
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
}

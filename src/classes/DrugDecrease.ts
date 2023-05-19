import Drug from '@/classes/Drug';
import FundContract from '@/classes/FundContract';
import ClassHelper from '@/services/ClassHelper';

export default class DrugDecrease {
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

  constructor(i?: DrugDecrease) {
    ClassHelper.BuildClass(this, i);
  }
}

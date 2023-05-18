import FundContract from '@/classes/FundContract';
import ClassHelper from '@/services/ClassHelper';

export default class BuyContract {
  id?: string;
  @ClassHelper.GetClassConstructor(FundContract)
  fundContract?: FundContract;
  fundContractId?: string;

  constructor(i?: BuyContract) {
    ClassHelper.BuildClass(this, i);
  }
}

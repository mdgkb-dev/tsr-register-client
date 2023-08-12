import Drug from '@/classes/Drug';
import ClassHelper from '@/services/ClassHelper';

export default class FundCouncil {
  id?: string;
  date = new Date();
  number = 0;

  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  drugId?: string;

  constructor(i?: FundCouncil) {
    ClassHelper.BuildClass(this, i);
  }
}

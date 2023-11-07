import MkbItem from '@/classes/MkbItem';
import Register from '@/classes/Register';
import ClassHelper from '@/services/ClassHelper';

export default class RegisterDiagnosis {
  id?: string;
  mkbItems: MkbItem[] = [];
  registerId?: string;
  register?: Register;
  @ClassHelper.GetClassConstructor(MkbItem)
  mkbItem?: MkbItem;
  mkbItemId?: string;

  constructor(i?: RegisterDiagnosis) {
    ClassHelper.BuildClass(this, i);
  }
}

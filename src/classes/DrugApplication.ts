import Commission from '@/classes/Commission';
import ClassHelper from '@/services/ClassHelper';

export default class DrugApplication {
  id?: string;
  date = new Date();

  @ClassHelper.GetClassConstructor(Commission)
  commission: Commission[] = [];

  constructor(i?: DrugApplication) {
    ClassHelper.BuildClass(this, i);
  }
}

import DrugDoze from '@/classes/DrugDoze';
import ClassHelper from '@/services/ClassHelper';

export default class DrugForm {
  id?: string;
  name = '';
  reportName = '';
  @ClassHelper.GetClassConstructor(DrugDoze)
  drugDozes: DrugDoze[] = [];
  nameINN = '';
  drugId?: string;
  dateRegistration?: Date;

  constructor(i?: DrugForm) {
    ClassHelper.BuildClass(this, i);
  }

  getName(): string {
    return this.name;
  }
}

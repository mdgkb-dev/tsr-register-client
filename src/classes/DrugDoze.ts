import ClassHelper from '@/services/ClassHelper';

export default class DrugDoze {
  id?: string;
  name = '';
  quantity = 0;
  drugFormId?: string;

  constructor(i?: DrugDoze) {
    ClassHelper.BuildClass(this, i);
  }

  getName(): string {
    return this.name;
  }
}

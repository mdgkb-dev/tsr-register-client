import ClassHelper from '@/services/ClassHelper';

export default class DrugDozeComponent {
  id?: string;
  name = '';
  measure = '';
  quantity = 0;

  drugDozeId?: string;

  constructor(i?: DrugDozeComponent) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'drugDozeComponent';
  }
}

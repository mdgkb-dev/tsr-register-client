import ClassHelper from '@/services/ClassHelper';

export default class FormulaResult {
  id?: string;
  name = '';
  lowRange = 0;
  highRange = 0;
  formulaId?: string;

  constructor(i?: FormulaResult) {
    ClassHelper.BuildClass(this, i);
  }

  checkValueInRange(value: number): boolean {
    return this.lowRange <= value && this.highRange >= value;
  }
}

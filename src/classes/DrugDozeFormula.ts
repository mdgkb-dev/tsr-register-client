import ClassHelper from '@/services/ClassHelper';

import Formula from './Formula';

export default class DrugDozeFormula {
  id?: string;
  quantity = 0;
  maxMonths?: number;
  maxWeight?: number;

  formulaId?: string;
  formula: Formula = new Formula();

  constructor(i?: DrugDozeFormula) {
    ClassHelper.BuildClass(this, i);
  }

  static GetClassName(): string {
    return 'drugDozeFormula';
  }
}

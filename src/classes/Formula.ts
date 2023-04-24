import Mexp from 'math-expression-evaluator';

import FormulaResult from '@/classes/FormulaResult';
import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class Formula {
  id?: string;
  name = '';
  formula = '';
  order = 0;
  researchId?: string;
  research?: Research;
  ageRelation = false;
  sexRelation = false;
  @ClassHelper.GetClassConstructor(FormulaResult)
  formulaResults: FormulaResult[] = [];

  constructor(i?: Formula) {
    ClassHelper.BuildClass(this, i);
  }

  calculate(variables: { [key: string]: number }): number {
    const mexp = new Mexp();
    let parsedFormula = this.formula;
    for (const [key, value] of Object.entries(variables)) {
      parsedFormula = parsedFormula.replaceAll(key, value.toString());
    }
    return mexp.eval(parsedFormula, [], {});
  }

  filterResults(isMale?: boolean, monthAge?: number): FormulaResult[] {
    return this.formulaResults.filter((f: FormulaResult) => {
      const sexPass = this.sexRelation ? f.isMale === isMale : true;
      const agePass = this.ageRelation ? f.monthFromBirth === monthAge : true;
      return sexPass && agePass;
    });
  }

  getResult(variables: { [key: string]: number }, isMale?: boolean, monthAge?: number): string {
    const formulaResult = this.filterResults(isMale, monthAge).find((fr: FormulaResult) => {
      return fr.checkValueInRange(this.calculate(variables));
    });
    return formulaResult ? formulaResult.name : 'Значение не найдено';
  }
}

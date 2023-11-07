import Mexp from 'math-expression-evaluator';

import FormulaResult from '@/classes/FormulaResult';
import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class Formula {
  id?: string;
  name = '';
  formula = '';
  color = '';
  order = 0;
  researchId?: string;
  research?: Research;
  ageRelation = false;
  sexRelation = false;
  @ClassHelper.GetClassConstructor(FormulaResult)
  formulaResults: FormulaResult[] = [];
  value = 0;

  constructor(i?: Formula) {
    ClassHelper.BuildClass(this, i);
  }

  calculate(variables: { [key: string]: number }): number {
    const mexp = new Mexp();
    let parsedFormula = this.formula;
    console.log(parsedFormula, variables);
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

  getResult(variables: { [key: string]: number }, isMale?: boolean, monthAge?: number): FormulaResult {
    const result = this.calculate(variables);

    const formulaResult = this.filterResults(isMale, monthAge).find((fr: FormulaResult) => {
      return fr.checkValueInRange(result);
    });
    const formulaResultObj = new FormulaResult(formulaResult);
    formulaResultObj.value = result;
    return formulaResultObj;
  }
}

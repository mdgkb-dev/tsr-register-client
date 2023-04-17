import Research from '@/classes/Research';
import ClassHelper from '@/services/ClassHelper';

export default class Formula {
  id?: string;
  name = '';
  formula = '';
  order = 0;
  researchId?: string;
  research?: Research;

  constructor(i?: Formula) {
    ClassHelper.BuildClass(this, i);
  }
}

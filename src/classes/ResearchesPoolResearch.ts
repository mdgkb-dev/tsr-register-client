import Research from '@/classes/Research';
import ResearchesPool from '@/classes/ResearchesPool';
import ClassHelper from '@/services/ClassHelper';

export default class ResearchesPoolResearch {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(ResearchesPool)
  researchesPool?: ResearchesPool;
  researchesPoolId?: string;
  @ClassHelper.GetClassConstructor(Research)
  research?: Research;
  researchId?: string;

  constructor(i?: ResearchesPoolResearch) {
    ClassHelper.BuildClass(this, i);
  }
}

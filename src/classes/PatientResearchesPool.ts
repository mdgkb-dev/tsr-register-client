import Patient from '@/classes/Patient';
import ResearchesPool from '@/classes/ResearchesPool';
import ClassHelper from '@/services/ClassHelper';

export default class PatientResearchesPool {
  id?: string;
  @ClassHelper.GetClassConstructor(ResearchesPool)
  researchesPool = new ResearchesPool();
  researchesPoolId?: string;
  order = 0;
  patientId?: string;

  constructor(i?: Patient) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(patientId: string | undefined, researchesPool: ResearchesPool): PatientResearchesPool {
    const item = new PatientResearchesPool();
    item.patientId = patientId;
    item.researchesPool = researchesPool;
    item.researchesPoolId = researchesPool.id;
    return item;
  }
}

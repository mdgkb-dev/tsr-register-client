import { v4 as uuidv4 } from 'uuid';

import Research from '@/classes/Research';
import ResearchResult from '@/classes/ResearchResult';
import ClassHelper from '@/services/ClassHelper';

export default class PatientResearch {
  id?: string;
  date = new Date();
  editMode = false;
  @ClassHelper.GetClassConstructor(Research)
  research?: Research;
  researchId?: string;
  order = 0;

  patientId?: string;
  fillingPercentage = 0;
  @ClassHelper.GetClassConstructor(ResearchResult)
  researchResults: ResearchResult[] = [];

  constructor(i?: PatientResearch) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(patientId: string | undefined, research: Research): PatientResearch {
    const item = new PatientResearch();
    item.id = uuidv4();
    item.patientId = patientId;
    item.research = research;
    item.researchId = research.id;
    return item;
  }

  recalculate(newResult: ResearchResult): void {
    const findedResult = this.getResult(newResult.id as string);
    if (!findedResult) {
      return;
    }
    findedResult.fillingPercentage = newResult.fillingPercentage;
    const filled = this.researchResults.filter((r: ResearchResult) => r.fillingPercentage === 100).length;
    const all = this.researchResults.length;
    this.fillingPercentage = Math.round((filled / all) * 100);
  }

  getResult(resultId: string): ResearchResult | undefined {
    return this.researchResults.find((r: ResearchResult) => r.id === resultId);
  }
  addResult(research: Research, patientResearchId?: string): ResearchResult {
    const item = ResearchResult.Create(research, patientResearchId);
    this.researchResults.push(item);
    return item;
  }

  getLastResult(): ResearchResult | undefined {
    if (this.researchResults.length === 0) {
      return;
    }
    return this.researchResults[this.researchResults.length - 1];
  }
}

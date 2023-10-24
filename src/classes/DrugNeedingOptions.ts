import ClassHelper from '@/services/ClassHelper';

export default class DrugNeedingOptions {
  weight = 0;
  height = 0;
  start = new Date();
  end = new Date();
  drugDozeId?: string;
  patientId?: string;

  constructor(i?: DrugNeedingOptions) {
    ClassHelper.BuildClass(this, i);
  }

  static Create(weight: number, height: number, start: Date, end: Date, drugDozeId?: string, patientId?: string): DrugNeedingOptions {
    const item = new DrugNeedingOptions();
    item.weight = weight;
    item.height = height;
    item.start = start;
    item.end = end;
    item.drugDozeId = drugDozeId;
    item.patientId = patientId;
    return item;
  }
}

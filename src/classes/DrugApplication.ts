import { v4 as uuidv4 } from 'uuid';

import Commission from '@/classes/Commission';
import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
import DrugApplicationFile from '@/classes/DrugApplicationFile';
import DrugApplicationStatus from '@/classes/DrugApplicationStatus';
import FileInfo from '@/classes/files/FileInfo';
import ClassHelper from '@/services/ClassHelper';
export default class DrugApplication {
  id?: string;
  date = new Date();
  @ClassHelper.GetClassConstructor(DrugApplicationStatus)
  drugApplicationStatus?: DrugApplicationStatus;
  drugApplicationStatusId?: string;
  number = '';
  // @ClassHelper.GetClassConstructor(FileInfo)
  // dzmAnswerFile?: FileInfo;
  // dzmAnswerFileId?: string;
  // dzmAnswerComment = '';

  @ClassHelper.GetClassConstructor(CommissionDrugApplication)
  commissionsDrugApplications: CommissionDrugApplication[] = [];

  constructor(i?: DrugApplication) {
    ClassHelper.BuildClass(this, i);
  }

  getNumber(): string {
    return this.number === '' ? 'Номер отсутствует' : this.number;
  }

  addCommission(commission: Commission): CommissionDrugApplication {
    const item = new CommissionDrugApplication();
    item.id = uuidv4();
    item.commission = commission;
    item.commissionId = commission.id;
    item.drugApplicationId = this.id;
    this.commissionsDrugApplications.push(item);
    return item;
  }

  commissionExists(commissionId?: string): boolean {
    return this.commissionsDrugApplications.some((c: CommissionDrugApplication) => c.commissionId === commissionId);
  }

  addFile(): DrugApplicationFile {
    const item = new DrugApplicationFile();
    item.id = uuidv4();
    item.fileInfo = new FileInfo();
    return item;
  }
}

import { v4 as uuidv4 } from 'uuid';

import Commission from '@/classes/Commission';
import CommissionDrugApplication from '@/classes/CommissionDrugApplication';
import DrugApplicationFile from '@/classes/DrugApplicationFile';
import FundContract from '@/classes/FundContract';
import Status from '@/classes/Status';
import ClassHelper from '@/services/ClassHelper';

export default class DrugApplication {
  id?: string;
  date = new Date();

  @ClassHelper.GetClassConstructor(Status)
  status?: Status;
  statusId?: string;

  number = '';

  @ClassHelper.GetClassConstructor(CommissionDrugApplication)
  commissionsDrugApplications: CommissionDrugApplication[] = [];

  @ClassHelper.GetClassConstructor(DrugApplicationFile)
  drugApplicationFiles: DrugApplicationFile[] = [];

  @ClassHelper.GetClassConstructor(FundContract)
  fundContract: FundContract = new FundContract();
  fundContractId?: string;

  constructor(i?: DrugApplication) {
    ClassHelper.BuildClass(this, i);
  }

  setDate(date: string): void {
    const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
    this.date = new Date(date.replace(pattern, '$3-$2-$1'));
  }

  getNumber(): string {
    return this.number === '' ? 'Номер отсутствует' : this.number;
  }

  addCommission(commission: Commission): CommissionDrugApplication {
    const item = new CommissionDrugApplication();
    item.id = uuidv4();
    item.commission = commission;
    item.commissionId = commission.id;
    // item.drugApplicationId = this.id;
    // this.commissionsDrugApplications.push(item);
    return item;
  }

  commissionExists(commissionId?: string): boolean {
    return this.commissionsDrugApplications.some((c: CommissionDrugApplication) => c.commissionId === commissionId);
  }

  addFile(): DrugApplicationFile {
    const item = new DrugApplicationFile();
    item.id = uuidv4();
    item.drugApplicationId = this.id;
    this.drugApplicationFiles.push(item);
    return item;
  }

  initFundContract(): void {
    this.fundContract.id = uuidv4();
    this.fundContractId = this.fundContract.id;
    this.fundContract.drugApplicationId = this.id;
  }
  static GetClassName(): string {
    return 'drugApplication';
  }
}

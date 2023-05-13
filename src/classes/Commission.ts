import CommissionDoctor from '@/classes/CommissionDoctor';
import CommissionDoctorTemplate from '@/classes/CommissionDoctorTemplate';
import CommissionTemplate from '@/classes/CommissionTemplate';
import Drug from '@/classes/Drug';
import DrugRegimen from '@/classes/DrugRegimen';
import Patient from '@/classes/Patient';
import ClassHelper from '@/services/ClassHelper';

export default class Commission {
  id?: string;
  date = new Date();
  endDate = new Date();
  @ClassHelper.GetClassConstructor(Patient)
  patient?: Patient;
  patientId?: string;
  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimen?: DrugRegimen;
  volume = '';
  @ClassHelper.GetClassConstructor(CommissionDoctor)
  commissionsDoctors: CommissionDoctor[] = [];
  status = '';

  constructor(i?: Commission) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateFromTemplate(template: CommissionTemplate): Commission {
    const item = new Commission();
    item.drug = template.drug;
    item.drugRegimen = template.drugRegimen;
    item.volume = template.volume;
    item.commissionsDoctors = template.commissionsDoctorsTemplates.map((cdt: CommissionDoctorTemplate) =>
      CommissionDoctor.CreateFromTemplate(cdt)
    );
    return item;
  }
}

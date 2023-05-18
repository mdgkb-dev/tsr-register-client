import CommissionDoctorTemplate from '@/classes/CommissionDoctorTemplate';
import Drug from '@/classes/Drug';
import DrugRegimen from '@/classes/DrugRegimen';
import ClassHelper from '@/services/ClassHelper';

export default class CommissionTemplate {
  id?: string;
  name = '';
  @ClassHelper.GetClassConstructor(Drug)
  drug?: Drug;
  @ClassHelper.GetClassConstructor(DrugRegimen)
  drugRegimen?: DrugRegimen;
  volume = '';
  @ClassHelper.GetClassConstructor(CommissionDoctorTemplate)
  commissionsDoctorsTemplates: CommissionDoctorTemplate[] = [];
  status = '';

  constructor(i?: CommissionTemplate) {
    ClassHelper.BuildClass(this, i);
  }
}

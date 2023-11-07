import Commission from '@/classes/Commission';
import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';

export default class CommissionDoctorTemplate {
  id?: string;
  @ClassHelper.GetClassConstructor(Doctor)
  doctor?: Doctor;
  doctorId?: string;
  @ClassHelper.GetClassConstructor(Commission)
  commission?: Commission;
  commissionId?: string;
  role = '';
  order = 0;

  constructor(i?: CommissionDoctorTemplate) {
    ClassHelper.BuildClass(this, i);
  }
}

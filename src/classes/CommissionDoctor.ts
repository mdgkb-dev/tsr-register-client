import { v4 as uuidv4 } from 'uuid';

import Commission from '@/classes/Commission';
import CommissionDoctorTemplate from '@/classes/CommissionDoctorTemplate';
import Doctor from '@/classes/Doctor';
import ClassHelper from '@/services/ClassHelper';

export default class CommissionDoctor {
  id?: string;
  @ClassHelper.GetClassConstructor(Doctor)
  doctor?: Doctor;
  doctorId?: string;
  @ClassHelper.GetClassConstructor(Commission)
  commission?: Commission;
  commissionId?: string;
  role = '';
  order = 0;

  constructor(i?: CommissionDoctor) {
    ClassHelper.BuildClass(this, i);
  }

  static CreateFromTemplate(template: CommissionDoctorTemplate): CommissionDoctor {
    const item = new CommissionDoctor();
    item.id = uuidv4();
    item.doctor = template.doctor;
    item.doctorId = template.doctorId;
    item.role = template.role;
    item.order = template.order;
    return item;
  }

  static Create(doctor: Doctor): CommissionDoctor {
    const item = new CommissionDoctor();
    item.id = uuidv4();
    item.doctor = doctor;
    item.doctorId = doctor.id;
    return item;
  }
}

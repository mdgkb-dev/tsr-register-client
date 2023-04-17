import Representative from '@/classes/Representative';
import RepresentativeType from '@/classes/RepresentativeType';
import ClassHelper from '@/services/ClassHelper';

import Patient from './Patient';

export default class PatientRepresentative {
  id?: string;
  representativeTypeId?: string;
  representativeType = new RepresentativeType();
  patientId?: string;
  @ClassHelper.GetClassConstructor(Patient)
  patient = new Patient();
  representativeId?: string;
  @ClassHelper.GetClassConstructor(Representative)
  representative = new Representative();

  constructor(i?: PatientRepresentative) {
    ClassHelper.BuildClass(this, i);
  }

  getRepresentativeParentType(): string {
    if (!this.representativeType) return '';
    if (this.representative?.human.isMale) {
      return this.representativeType.parentMaleType;
    } else {
      return this.representativeType.parentWomanType;
    }
  }
  getRepresentativeChildType(): string {
    if (!this.representativeType) return '';
    if (this.patient?.human.isMale) {
      return this.representativeType.childMaleType;
    } else {
      return this.representativeType.childWomanType;
    }
  }
}

import RepresentativeType from '@/classes/representatives/RepresentativeType';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default class RepresentativeToPatient implements IRepresentativeToPatient {
  id?: string;
  representativeTypeId?: string;
  representativeType?: IRepresentativeType;
  patientId?: string;
  patient?: IPatient;
  representativeId?: string;
  representative?: IRepresentative;

  constructor(representativeToPatient?: IRepresentativeToPatient) {
    if (!representativeToPatient) {
      return;
    }
    this.id = representativeToPatient.id;
    this.representativeTypeId = representativeToPatient.representativeTypeId;
    this.representativeType = new RepresentativeType(representativeToPatient.representativeType);
    this.patientId = representativeToPatient.patientId;
    this.patient = representativeToPatient.patient;
    this.representativeId = representativeToPatient.representativeId;
    this.representative = representativeToPatient.representative;
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

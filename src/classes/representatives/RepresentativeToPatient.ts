import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IPatient from '@/interfaces/patients/IPatient';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';
import RepresentativeType from '@/classes/representatives/RepresentativeType';

export default class RepresentativeToPatient implements IRepresentativeToPatient {
  id?: string;
  representativeTypeId?: string;
  representativeType?: IRepresentativeType;
  patientId?: string;
  patient?: IPatient;
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
    this.representative = representativeToPatient.representative;
  }
}

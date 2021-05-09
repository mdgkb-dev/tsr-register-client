import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IPatient from '@/interfaces/patients/IPatient';

export default class RepresentativeToPatient implements IRepresentativeToPatient {
  id?: string;
  type = '';
  patientId?: string;
  patient?: IPatient;
  representative?: IRepresentative;

  constructor(representativeToPatient?: IRepresentativeToPatient) {
    if (!representativeToPatient) {
      return;
    }
    this.id = representativeToPatient.id;
    this.type = representativeToPatient.type;
    this.patientId = representativeToPatient.patientId;
    this.patient = representativeToPatient.patient;
    this.representative = representativeToPatient.representative;
  }
}

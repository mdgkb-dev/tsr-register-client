import IPatient from '@/interfaces/patients/IPatient';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default interface IRepresentativeToPatient {
  id?: string;
  representativeTypeId?: string;
  representativeType?: IRepresentativeType;
  patientId?: string;
  patient?: IPatient;
  representativeId?: string;
  representative?: IRepresentative;

  getRepresentativeParentType: () => string;
  getRepresentativeChildType: () => string;
}

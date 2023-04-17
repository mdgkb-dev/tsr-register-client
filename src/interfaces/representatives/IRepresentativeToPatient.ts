import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeType from '@/interfaces/representatives/IRepresentativeType';

export default interface IRepresentativeToPatient {
  id?: string;
  representativeTypeId?: string;
  representativeType?: IRepresentativeType;
  patientId?: string;
  patient?: Patient;
  representativeId?: string;
  representative?: IRepresentative;

  getRepresentativeParentType: () => string;
  getRepresentativeChildType: () => string;
}

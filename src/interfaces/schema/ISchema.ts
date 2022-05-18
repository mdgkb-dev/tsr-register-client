import IDisabilitySchema from '@/interfaces/schema/IDisabilitySchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IPatientDiagnosisSchema from '@/interfaces/schema/IPatientDiagnosisSchema';
import IPatientSchema from '@/interfaces/schema/IPatientSchema';
import IRepresentativeSchema from '@/interfaces/schema/IRepresentativeSchema';

export default interface ISchema {
  human: IHumanSchema;
  patient: IPatientSchema;
  patientDiagnosis: IPatientDiagnosisSchema;
  representative: IRepresentativeSchema;
  disability: IDisabilitySchema;
}

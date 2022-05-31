import IDisabilitySchema from '@/interfaces/schema/IDisabilitySchema';
import IDrugSchema from '@/interfaces/schema/IDrugSchema';
import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IMkbConcreteDiagnosisSchema from '@/interfaces/schema/IMkbConcreteDiagnosisSchema';
import IMkbDiagnosisSchema from '@/interfaces/schema/IMkbDiagnosisSchema';
import IMkbGroupSchema from '@/interfaces/schema/IMkbGroupSchema';
import IMkbSubDiagnosisSchema from '@/interfaces/schema/IMkbSubDiagnosisSchema';
import IPatientDiagnosisSchema from '@/interfaces/schema/IPatientDiagnosisSchema';
import IPatientSchema from '@/interfaces/schema/IPatientSchema';
import IRegisterToPatientSchema from '@/interfaces/schema/IRegisterToPatientSchema';
import IRepresentativeSchema from '@/interfaces/schema/IRepresentativeSchema';

export default interface ISchema {
  human: IHumanSchema;
  patient: IPatientSchema;
  patientDiagnosis: IPatientDiagnosisSchema;
  representative: IRepresentativeSchema;
  disability: IDisabilitySchema;
  mkbGroup: IMkbGroupSchema;
  mkbDiagnosis: IMkbDiagnosisSchema;
  mkbSubDiagnosis: IMkbSubDiagnosisSchema;
  mkbConcreteDiagnosis: IMkbConcreteDiagnosisSchema;
  drug: IDrugSchema;
  registerToPatient: IRegisterToPatientSchema;
}

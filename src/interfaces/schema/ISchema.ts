import IHumanSchema from '@/interfaces/schema/IHumanSchema';
import IPatientDiagnosisSchema from '@/interfaces/schema/IPatientDiagnosisSchema';

export default interface ISchema {
  humanSchema: IHumanSchema;
  patientDiagnosisSchema: IPatientDiagnosisSchema;
}

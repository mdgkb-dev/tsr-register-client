import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IPatientDiagnosisSchema extends IBaseSchema {
  mkbDiagnosisId: string;
  mkbSubDiagnosisId: string;

  joinTable: string;
  joinTableFk: string;
  joinTablePk: string;
}

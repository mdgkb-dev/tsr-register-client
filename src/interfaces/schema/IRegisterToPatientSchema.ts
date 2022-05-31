import IBaseSchema from '@/interfaces/schema/IBaseSchema';

export default interface IRegisterToPatientSchema extends IBaseSchema {
  registerId: string;
  patientId: string;
}

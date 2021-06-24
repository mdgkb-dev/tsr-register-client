import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';

export default interface IRegisterPropertyToPatient {
  id?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;
  registerPropertyRadioId?: string;
  registerPropertyRadio?: IRegisterPropertyRadio;
  registerPropertyId?: string;
  patientId?: string;
}

import IRegisterPropertyMeasure from '@/interfaces/registers/IRegisterPropertyMeasure';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';

export default interface IRegisterPropertyToPatient {
  id?: string;
  valueString?: string;
  valueOther?: string;
  valueNumber?: number;
  valueDate?: Date;
  registerPropertyRadioId?: string;
  registerPropertyRadio?: IRegisterPropertyRadio;
  registerPropertyId?: string;
  patientId?: string;
  registerPropertyMeasure: IRegisterPropertyMeasure;
  registerPropertyMeasureId?: string;
}

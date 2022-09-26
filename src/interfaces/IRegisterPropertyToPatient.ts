import IRegisterPropertyMeasure from '@/interfaces/IRegisterPropertyMeasure';
import IRegisterPropertyRadio from '@/interfaces/IRegisterPropertyRadio';
import IRegisterPropertyVariant from '@/interfaces/IRegisterPropertyVariant';

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

  registerPropertyVariant: IRegisterPropertyVariant;
  registerPropertyVariantId?: string;
}

import RegisterPropertyRadio from '@/classes/registers/RegisterPropertyRadio';
import IRegisterPropertyRadio from '@/interfaces/registers/IRegisterPropertyRadio';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';

export default class RegisterPropertyToPatient implements IRegisterPropertyToPatient {
  id?: string;
  valueString?: string;
  valueNumber?: number;
  valueDate?: Date;
  registerPropertyRadioId?: string;
  registerPropertyRadio?: IRegisterPropertyRadio;
  registerPropertyId?: string;
  patientId?: string;

  constructor(item?: IRegisterPropertyToPatient) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.valueString = item.valueString;
    this.valueNumber = item.valueNumber;
    this.valueDate = item.valueDate;
    this.registerPropertyRadioId = item.registerPropertyRadioId;
    if (item.registerPropertyRadio) this.registerPropertyRadio = new RegisterPropertyRadio(item.registerPropertyRadio);
    this.patientId = item.patientId;
    this.registerPropertyId = item.registerPropertyId;
  }
}

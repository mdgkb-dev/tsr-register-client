import { v4 as uuidv4 } from 'uuid';

import RegisterPropertyMeasure from '@/classes/RegisterPropertyMeasure';
import RegisterPropertyRadio from '@/classes/RegisterPropertyRadio';
import RegisterPropertyToPatientToFile from '@/classes/RegisterPropertyToPatientToFile';
import RegisterPropertyVariant from '@/classes/RegisterPropertyVariant';
import IRegisterPropertyRadio from '@/interfaces/IRegisterPropertyRadio';
import IRegisterPropertyToPatient from '@/interfaces/IRegisterPropertyToPatient';
import IRegisterPropertyToPatientToFile from '@/interfaces/IRegisterPropertyToPatientToFile';

export default class RegisterPropertyToPatient implements IRegisterPropertyToPatient {
  id?: string;
  valueString?: string;
  valueOther?: string;
  valueNumber?: number;
  valueDate?: Date;
  registerPropertyRadioId?: string;
  registerPropertyRadio?: IRegisterPropertyRadio;
  registerPropertyId?: string;
  patientId?: string;

  registerPropertyVariant = new RegisterPropertyVariant();
  registerPropertyVariantId?: string;

  registerPropertyMeasure = new RegisterPropertyMeasure();
  registerPropertyMeasureId?: string;

  registerPropertiesToPatientsToFileInfos: IRegisterPropertyToPatientToFile[] = [];
  registerPropertiesToPatientsToFileInfosForDelete: string[] = [];

  constructor(item?: IRegisterPropertyToPatient) {
    if (!item) {
      return;
    }
    this.id = item.id;
    this.valueString = item.valueString;
    this.valueOther = item.valueOther;
    this.valueNumber = item.valueNumber;
    this.valueDate = item.valueDate;
    this.registerPropertyRadioId = item.registerPropertyRadioId;
    if (item.registerPropertyRadio) {
      this.registerPropertyRadio = new RegisterPropertyRadio(item.registerPropertyRadio);
    }
    if (item.registerPropertyMeasure) {
      this.registerPropertyMeasure = new RegisterPropertyMeasure(item.registerPropertyMeasure);
    }
    if (item.registerPropertyVariant) {
      this.registerPropertyVariant = new RegisterPropertyVariant(item.registerPropertyVariant);
    }
    this.registerPropertyMeasureId = item.registerPropertyMeasureId;
    this.registerPropertyVariantId = item.registerPropertyVariantId;
    this.patientId = item.patientId;
    this.registerPropertyId = item.registerPropertyId;
    if (item.registerPropertiesToPatientsToFileInfos) {
      this.registerPropertiesToPatientsToFileInfos = item.registerPropertiesToPatientsToFileInfos.map(
        (i: IRegisterPropertyToPatientToFile) => {
          return new RegisterPropertyToPatientToFile(i);
        }
      );
    }
  }
  addPropertyToFile(): void {
    const f = new RegisterPropertyToPatientToFile();
    f.id = uuidv4();
    this.registerPropertiesToPatientsToFileInfos.push(f);
  }
}

import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IPatientDrugRegimenItem from '@/interfaces/patients/IPatientDrugRegimenItem';

import PatientDrugRegimen from './PatientDrugRegimen';

export default class PatientDrugRegimenItem implements IPatientDrugRegimenItem {
  id?: string;
  date?: Date;
  gettingDate?: Date;
  patientDrugRegimenId?: string;

  patientDrugRegimen?: IPatientDrugRegimen;

  constructor(patientDrugRegimenItem?: IPatientDrugRegimenItem) {
    if (!patientDrugRegimenItem) {
      return;
    }
    this.id = patientDrugRegimenItem.id;
    this.date = patientDrugRegimenItem.date;
    this.gettingDate = patientDrugRegimenItem.gettingDate;
    this.patientDrugRegimenId = patientDrugRegimenItem.patientDrugRegimenId;
    if (patientDrugRegimenItem.patientDrugRegimen) {
      this.patientDrugRegimen = new PatientDrugRegimen(patientDrugRegimenItem.patientDrugRegimen);
    }
  }
}

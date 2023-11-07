import ClassHelper from '@/services/ClassHelper';

import PatientDrugRegimen from './PatientDrugRegimen';

export default class PatientDrugRegimenItem {
  id?: string;
  date?: Date;
  gettingDate?: Date;
  patientDrugRegimenId?: string;

  patientDrugRegimen?: PatientDrugRegimen;

  constructor(i?: PatientDrugRegimenItem) {
    ClassHelper.BuildClass(this, i);
  }
}

import Drug from '@/classes/Drug';
import DrugRegimen from '@/classes/DrugRegimen';
import Patient from '@/classes/Patient';
import PatientDrugRegimenItem from '@/classes/PatientDrugRegimenItem';
import ClassHelper from '@/services/ClassHelper';

export default class PatientDrugRegimen {
  id?: string;
  date = '';
  drugId?: string;
  patientId?: string;
  drugRegimenId?: string;
  patientDrugRegimenItems: PatientDrugRegimenItem[] = [];

  drug?: Drug;
  patient?: Patient;
  drugRegimen?: DrugRegimen;

  constructor(i?: PatientDrugRegimen) {
    ClassHelper.BuildClass(this, i);
  }
}

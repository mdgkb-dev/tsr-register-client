import Drug from '@/classes/drugs/Drug';
import DrugRegimen from '@/classes/drugs/DrugRegimen';
import Patient from '@/classes/patients/Patient';
import PatientDrugRegimenItem from '@/classes/patients/PatientDrugRegimenItem';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IPatientDrugRegimenItem from '@/interfaces/patients/IPatientDrugRegimenItem';

export default class PatientDrugRegimen implements IPatientDrugRegimen {
  id?: string;
  date = '';
  drugId?: string;
  patientId?: string;
  drugRegimenId?: string;
  patientDrugRegimenItems: IPatientDrugRegimenItem[] = [];

  drug?: IDrug;
  patient?: IPatient;
  drugRegimen?: IDrugRegimen;

  constructor(patientDrugRegimen?: IPatientDrugRegimen) {
    if (!patientDrugRegimen) {
      return;
    }
    this.id = patientDrugRegimen.id;
    this.date = patientDrugRegimen.date;
    this.patientId = patientDrugRegimen.patientId;
    this.drugRegimenId = patientDrugRegimen.drugRegimenId;
    if (patientDrugRegimen.drug) {
      this.drug = new Drug(patientDrugRegimen.drug);
    }
    if (patientDrugRegimen.patient) {
      this.patient = new Patient(patientDrugRegimen.patient);
    }
    if (patientDrugRegimen.drugRegimen) {
      this.drugRegimen = new DrugRegimen(patientDrugRegimen.drugRegimen);
    }
    if (patientDrugRegimen.drugRegimen?.drugId) {
      this.drugId = patientDrugRegimen.drugRegimen.drugId;
    }
    if (patientDrugRegimen.drugRegimen?.drug) {
      this.drug = new Drug(patientDrugRegimen.drugRegimen.drug);
    }
    if (patientDrugRegimen.patientDrugRegimenItems) {
      this.patientDrugRegimenItems = patientDrugRegimen.patientDrugRegimenItems.map(
        (i: IPatientDrugRegimenItem) => new PatientDrugRegimenItem(i)
      );
    }
  }
}

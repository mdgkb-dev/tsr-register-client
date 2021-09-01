import IPatientDrugRegimen from './IPatientDrugRegimen';

export default interface IPatientDrugRegimenItem {
  id?: string;
  date?: Date;
  gettingDate?: Date;
  patientDrugRegimenId?: string;

  patientDrugRegimen?: IPatientDrugRegimen;
}

import IDrug from '../drugs/IDrug';
import IDrugRegimen from '../drugs/IDrugRegimen';
import IPatient from './IPatient';
import IPatientDrugRegimenItem from './IPatientDrugRegimenItem';

export default interface IPatientDrugRegimen {
  id?: string;
  date: string;
  drugId?: string;
  patientId?: string;
  drugRegimenId?: string;
  patientDrugRegimenItems: IPatientDrugRegimenItem[];

  drug?: IDrug;
  patient?: IPatient;
  drugRegimen?: IDrugRegimen;
}

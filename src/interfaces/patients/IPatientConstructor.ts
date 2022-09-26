import ICircumference from '@/interfaces/anthropometry/ICircumference';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IHistory from '@/interfaces/history/IHistory';
import IHuman from '@/interfaces/IHuman';
import IRegisterGroupToPatient from '@/interfaces/IRegisterGroupToPatient';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IModelInfo from '@/interfaces/shared/IModelInfo';

export default interface IPatientConstructor extends IModelInfo {
  id?: string;
  patientHistoryId?: string;
  regionId?: string;
  human: IHuman;
  history?: IHistory;
  patientDiagnosis: IPatientDiagnosis[];
  patientDiagnosisForDelete: string[];
  representativeToPatient: IRepresentativeToPatient[];
  representativeToPatientForDelete: string[];
  disabilities: IDisability[];
  disabilitiesForDelete: string[];
  heightWeight: IHeightWeight[];
  heightWeightForDelete: string[];
  registerToPatient: IRegisterToPatient[];
  registerToPatientForDelete: string[];
  registerGroupsToPatient: IRegisterGroupToPatient[];
  registerGroupsToPatientForDelete: string[];
  patientDrugRegimen: IPatientDrugRegimen[];
  patientDrugRegimenForDelete: string[];
  chestCircumference: ICircumference[];
  chestCircumferenceForDelete: string[];
  headCircumference: ICircumference[];
  headCircumferenceForDelete: string[];
}

import IDisability from '@/interfaces/disabilities/IDisability';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IHuman from '@/interfaces/humans/IHuman';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IModelInfo from '@/interfaces/shared/IModelInfo';

export default interface IPatientConstructor extends IModelInfo {
  id?: string;
  human: IHuman;
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
  registerPropertyToPatient: IRegisterPropertyToPatient[];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[];
  registerPropertySetToPatientForDelete: string[];
  patientDrugRegimen: IPatientDrugRegimen[];
  patientDrugRegimenForDelete: string[];
}

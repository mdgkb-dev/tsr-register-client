import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IHuman from '@/interfaces/humans/IHuman';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterPropertySetToPatient from '@/interfaces/registers/IRegisterPropertySetToPatient';
import IRegisterPropertyToPatient from '@/interfaces/registers/IRegisterPropertyToPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

export default interface IPatientConstructor {
  id?: string;
  human: IHuman;
  patientDiagnosis: IPatientDiagnosis[];
  representativeToPatient: IRepresentativeToPatient[];
  representativeToPatientForDelete: string[];
  disabilities: IDisability[];
  disabilitiesForDelete: string[];
  heightWeight: IHeightWeight[];
  heightWeightForDelete: string[];
  registerToPatient: IRegisterToPatient[];
  registerPropertyToPatient: IRegisterPropertyToPatient[];
  registerPropertySetToPatient: IRegisterPropertySetToPatient[];
  registerPropertySetToPatientForDelete: string[];
}

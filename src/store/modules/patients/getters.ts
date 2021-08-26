import { GetterTree } from 'vuex';

import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/humans/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  patients(state): IPatient[] | undefined {
    return state.patients;
  },
  filteredPatients(state): IPatient[] | undefined {
    return state.filteredPatients;
  },
  patient(state): IPatient | undefined {
    return state.patient;
  },
  getById(state, id: string): IPatient | undefined {
    return state.patients.find((item: IPatient) => item.id === id);
  },
  getHuman(state: State): IHuman {
    return state.patient.human;
  },
  insuranceCompanies(state): IInsuranceCompanyToHuman[] {
    return state.patient.human.insuranceCompanyToHuman;
  },
  getDiagnosis(state): IPatientDiagnosis[] {
    return state.patient.patientDiagnosis;
  },
  getAnamnesis(state, indices: { diagnosisIndex: number; anamnesisIndex: number }): IPatientDiagnosisAnamnesis {
    return state.patient.patientDiagnosis[indices.diagnosisIndex].patientDiagnosisAnamnesis[indices.anamnesisIndex];
  },
  registerToPatient(state): IRegisterToPatient[] {
    return state.patient.registerToPatient;
  },
  representativeToPatient(state): IRepresentativeToPatient[] {
    return state.patient.representativeToPatient;
  },
  birthDate(state): string {
    return state.patient.human.dateBirth;
  },
  isMale(state): boolean {
    return state.patient.human.isMale;
  },
  heightWeight(state): IHeightWeight[] {
    return state.patient.heightWeight;
  },
  documents(state): IDocument[] {
    return state.patient.human.documents;
  },
  fileInfos(state): IFileInfo[] {
    console.log('state.patient.human.fileInfos', state.patient.human.fileInfos);
    return state.patient.human.fileInfos;
  },
  disabilities(state): IDisability[] {
    return state.patient.disabilities;
  },
};

export default getters;

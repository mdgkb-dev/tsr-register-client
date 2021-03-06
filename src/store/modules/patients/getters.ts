import { GetterTree } from 'vuex';

import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import IDisability from '@/interfaces/disabilities/IDisability';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IFIlesList from '@/interfaces/files/IFIlesList';
import IHuman from '@/interfaces/humans/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  patients(state): IPatient[] | undefined {
    return state.patients;
  },
  patientsHistory(state): IPatient[] {
    return state.patientsHistory;
  },
  getHuman(state): IHuman {
    return state.patient.human;
  },
  count(state): number {
    return state.count;
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
  insuranceCompanies(state): IInsuranceCompanyToHuman[] {
    return state.patient.human.insuranceCompanyToHuman;
  },
  diagnosis(state): IPatientDiagnosis[] {
    return state.patient.patientDiagnosis;
  },
  registerToPatient(state): IRegisterToPatient[] {
    return state.patient.registerToPatient;
  },
  patientDrugRegimens(state): IPatientDrugRegimen[] {
    return state.patient.patientDrugRegimen;
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
    return state.patient.human.fileInfos;
  },
  disabilities(state): IDisability[] {
    return state.patient.disabilities;
  },
  fileList(state): IFIlesList[] {
    return state.photoFileList;
  },
  fileInfo(state): IFileInfo | undefined {
    return state.patient.human.photo;
  },
  isEditMode(state): boolean {
    return state.isEditMode;
  },
};

export default getters;

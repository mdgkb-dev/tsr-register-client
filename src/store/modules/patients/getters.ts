import { GetterTree } from 'vuex';

import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import { RootState } from '@/store/types';

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
  insuranceCompanies(state): IInsuranceCompanyToHuman[] {
    return state.patient.human.insuranceCompanyToHuman;
  },
  patientDiagnosis(state): IPatientDiagnosis[] {
    return state.patient.patientDiagnosis;
  },
  registerToPatient(state): IRegisterToPatient[] {
    return state.patient.registerToPatient;
  },
  representativeToPatient(state): IRepresentativeToPatient[] {
    return state.patient.representativeToPatient;
  },
};

export default getters;

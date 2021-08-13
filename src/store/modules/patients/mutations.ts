import { MutationTree } from 'vuex';

import Patient from '@/classes/patients/Patient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, patients: IPatient[]) {
    state.patients = patients.map((p: IPatient) => new Patient(p));
  },
  set(state, patient: IPatient) {
    state.patient = new Patient(patient);
  },
  create(state, patient: IPatient) {
    state.patients.push(new Patient(patient));
  },
  update(state, patient: IPatient) {
    const item = state.patients.find((i: IPatient) => i.id === patient.id);
    if (item) {
      Object.assign(item, patient);
    }
  },
  delete(state, id: string) {
    const i = state.patients.findIndex((item: IPatient) => item.id === id);
    state.patients.splice(i, 1);
  },
  setFilteredPatients(state, patients: IPatient[]) {
    state.filteredPatients = patients.map((p: IPatient) => new Patient(p));
  },
  addInsurance(state) {
    state.patient.human.insuranceCompanyToHuman.push({
      number: '',
      insuranceCompanyId: '',
      humanId: undefined,
    });
  },
  removeInsurance(state, item: IInsuranceCompanyToHuman): void {
    const index = state.patient.human.insuranceCompanyToHuman.indexOf(item);
    if (index !== -1) {
      state.patient.human.insuranceCompanyToHuman.splice(index, 1);
    }
  },
  setRegisterts(state, registerToPatient: IRegisterToPatient[]) {
    state.patient.registerToPatient = registerToPatient;
  },
  addRepresentative(state) {
    state.patient.representativeToPatient.push(new RepresentativeToPatient());
  },
  removeRepresentative(state, item: IRepresentativeToPatient): void {
    const index = state.patient.representativeToPatient.indexOf(item);
    if (index !== -1) {
      state.patient.representativeToPatient.splice(index, 1);
    }
  },
};

export default mutations;

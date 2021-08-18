import { v4 as uuidv4 } from 'uuid';
import { MutationTree } from 'vuex';

import HeightWeight from '@/classes/anthropometry/HeightWeight';
import Disability from '@/classes/disability/Disability';
import Edv from '@/classes/disability/Edv';
import InsuranceCompanyToHuman from '@/classes/insuranceCompanies/InsuranceCompanyToHuman';
import Patient from '@/classes/patients/Patient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
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
  // setHuman(state)
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
    state.patient.human.insuranceCompanyToHuman.push(new InsuranceCompanyToHuman());
  },
  removeInsurance(state, item: IInsuranceCompanyToHuman): void {
    const index = state.patient.human.insuranceCompanyToHuman.indexOf(item);
    if (index > -1) state.patient.human.insuranceCompanyToHuman.splice(index, 1);
  },
  setRegisterts(state, registerToPatient: IRegisterToPatient[]) {
    state.patient.registerToPatient = registerToPatient;
  },
  addRepresentative(state) {
    state.patient.representativeToPatient.push(new RepresentativeToPatient());
  },
  removeRepresentative(state, item: IRepresentativeToPatient): void {
    const index = state.patient.representativeToPatient.indexOf(item);
    if (index !== -1) state.patient.representativeToPatient.splice(index, 1);
  },
  addHeightWeight(state) {
    state.patient.heightWeight.push(new HeightWeight());
  },
  removeHeightWeight(state, i: number) {
    state.patient.heightWeight.splice(i, 1);
  },
  addDisability(state) {
    const disability = new Disability();
    disability.id = uuidv4();
    state.patient.disabilities.push(disability);
  },
  addEdv(state, disabilityId: string) {
    const edv = new Edv();
    edv.id = uuidv4();
    edv.disabilityId = disabilityId;
    const disabilitiy = state.patient.disabilities.find((d: IDisability): boolean => d.id === edv.disabilityId);
    if (!disabilitiy) return;
    disabilitiy.edvs.push(edv);
  },
  removeEdv(state, edv: IEdv) {
    const disabilitiy = state.patient.disabilities.find((d: IDisability): boolean => d.id === edv.disabilityId);
    if (!disabilitiy) return;
    const edvIndex = disabilitiy.edvs.findIndex((e: IEdv): boolean => e.id === edv.id);
    if (edvIndex < 0) return;
    disabilitiy.edvs.splice(edvIndex, 1);
  },
  removeDisability(state, item: IDisability) {
    const index = state.patient.disabilities.indexOf(item);
    if (index !== -1) state.patient.disabilities.splice(index, 1);
  },
  addDocument(state, item: IDocument) {
    state.patient.human.documents.push(item);
  },
  removeDocument(state, id: string) {
    const i = state.patient.human.documents.findIndex((item: IDocument) => item.id === id);
    if (i > -1) state.patient.human.documents.splice(i, 1);
  },
  addFiles(state, item: IFileInfo) {
    state.patient.human.fileInfos.push(item);
  },
  removeFile(state, id: string) {
    const i = state.patient.human.fileInfos.findIndex((item: IFileInfo) => item.id === id);
    if (i > -1) state.patient.human.fileInfos.splice(i, 1);
  },
};

export default mutations;

import cloneDeep from 'lodash/cloneDeep';
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
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/humans/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IPatient from '@/interfaces/patients/IPatient';
import IRegisterToPatient from '@/interfaces/registers/IRegisterToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';

import { State } from './state';
import IFile from '@/interfaces/files/IFile';
import RegisterToPatient from '@/classes/registers/RegisterToPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import IRegisterDiagnosis from '@/interfaces/registers/IRegisterDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';

const mutations: MutationTree<State> = {
  setAll(state, patients: IPatient[]) {
    state.patients = patients.map((p: IPatient) => new Patient(p));
  },
  set(state, patient: IPatient) {
    state.photoFileList = [];
    state.patient = new Patient(patient);
    if (state.patient.human.photo) state.photoFileList[0] = state.patient.human.photo.getFileListObject();
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
  setHuman(state, human: IHuman) {
    state.patient.human = cloneDeep(human);
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
    if (item.id) state.patient.human.insuranceCompanyToHumanForDelete.push(item.id);
  },
  addRegister(state, registerId: string) {
    const registerToPatient = new RegisterToPatient();
    registerToPatient.registerId = registerId;
    state.patient.registerToPatient.push(registerToPatient);
  },
  removeRegister(state, registerId: string) {
    const index = state.patient.registerToPatient.findIndex((i: IRegisterToPatient) => i.registerId === registerId);
    if (index > -1) {
      const idForDelete = state.patient.registerToPatient[index].id;
      if (idForDelete) state.patient.registerToPatientForDelete.push(idForDelete);
      state.patient.registerToPatient.splice(index, 1);
    }
  },
  addRepresentative(state) {
    state.patient.representativeToPatient.push(new RepresentativeToPatient());
  },
  removeRepresentative(state, item: IRepresentativeToPatient): void {
    const index = state.patient.representativeToPatient.indexOf(item);
    if (index !== -1) state.patient.representativeToPatient.splice(index, 1);
    if (item.id) state.patient.representativeToPatientForDelete.push(item.id);
  },
  addHeightWeight(state) {
    state.patient.heightWeight.push(new HeightWeight());
  },
  removeHeightWeight(state, item: HeightWeight) {
    const index = state.patient.heightWeight.indexOf(item);
    if (index !== -1) state.patient.heightWeight.splice(index, 1);
    if (item.id) state.patient.heightWeightForDelete.push(item.id);
  },
  addDisability(state) {
    const disability = new Disability();
    disability.id = uuidv4();
    state.patient.disabilities.push(disability);
  },
  setEdvDateEnd(state, id: string) {
    state.patient.disabilities = state.patient.disabilities.map((disability: IDisability) => {
      disability.edvs = disability.edvs.map((i: IEdv) => {
        if (i.id === id && i.period) {
          const date = new Date(i.period.dateStart);
          date.setFullYear(date.getFullYear() + 1);
          i.period.dateEnd = date.toISOString();
          return i;
        }
        return i;
      });
      return disability;
    });
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
    if (item.id) state.patient.disabilitiesForDelete.push(item.id);
  },
  addDocument(state, item: IDocument) {
    state.patient.human.documents.push(item);
  },
  removeDocument(state, id: string) {
    const i = state.patient.human.documents.findIndex((item: IDocument) => item.id === id);
    if (i > -1) state.patient.human.documents.splice(i, 1);
    state.patient.human.documentsForDelete.push(id);
  },
  addDocumentsFiles(state, items: IFileInfoToDocument[]) {
    const i = state.patient.human.documents.findIndex((doc: IDocument) => doc.id === items[0].documentId);
    if (i > -1) {
      state.patient.human.documents[i].fileInfoToDocument = [...state.patient.human.documents[i].fileInfoToDocument, ...items];
    }
  },
  removeFile(state, fileInfoToDocumentId: string) {
    state.patient.human.documents.forEach((doc: IDocument) => {
      doc.fileInfoToDocument.forEach((fileInfoToDocument: IFileInfoToDocument, i: number) => {
        if (fileInfoToDocument.id === fileInfoToDocumentId) {
          doc.fileInfoToDocumentForDelete.push(fileInfoToDocumentId);
          doc.fileInfoToDocument.splice(i, 1);
        }
      });
    });
  },
  resetPatient(state) {
    state.patient = new Patient();
  },
  setPhoto(state, file: IFileInfo) {
    state.patient.human.photo = file;
    state.patient.human.photoId = file.id;
  },
  setFileList(state, file: IFile) {
    if (!state.patient.human.photo) return;
    state.patient.human.photo.file = file.blob;
    if (state.patient.human.photo.fileSystemPath) {
      state.photoFileList[0] = { name: state.patient.human.photo.fileSystemPath, url: file.src };
    }
  },
  removePhoto(state) {
    state.patient.human.photo = undefined;
    state.patient.human.photoId = undefined;
  },
  addDiagnosis(state, patientDiagnosis?: IPatientDiagnosis) {
    if (patientDiagnosis) {
      state.patient.patientDiagnosis.push(patientDiagnosis);
      return;
    }
    const diagnosis = new PatientDiagnosis();
    diagnosis.id = uuidv4();
    state.patient.patientDiagnosis.push(diagnosis);
  },
  removeDiagnosis(state, id: string) {
    const index = state.patient.patientDiagnosis.findIndex((i: IPatientDiagnosis) => i.id === id);
    if (index !== -1) state.patient.patientDiagnosis.splice(index, 1);
    state.patient.patientDiagnosisForDelete.push(id);
  },
  removeDiagnosisByDiagnosisOrSubDiagnosisId(state, id: string) {
    const checkedDiagnosis = state.patient.patientDiagnosis.filter(
      (diagnosis: IPatientDiagnosis | IRegisterDiagnosis) => diagnosis.mkbDiagnosisId === id || diagnosis.mkbSubDiagnosisId === id
    );
    checkedDiagnosis.forEach((d: IPatientDiagnosis) => {
      const index = state.patient.patientDiagnosis.indexOf(d);
      if (index !== -1) state.patient.patientDiagnosis.splice(index, 1);
    });
    state.patient.patientDiagnosisForDelete.push(id);
  },
  clearDiagnosis(state, id: string) {
    const diagnosis = state.patient.patientDiagnosis.find((d: IPatientDiagnosis) => d.id === id);
    if (diagnosis) {
      diagnosis.mkbDiagnosis = new MkbDiagnosis();
      diagnosis.mkbDiagnosisId = undefined;
      diagnosis.mkbSubDiagnosis = undefined;
      diagnosis.mkbSubDiagnosisId = undefined;
    }
  },
  removeAnamnesis(state, id: string) {
    state.patient.patientDiagnosis.forEach((d: IPatientDiagnosis) => {
      const index = d.patientDiagnosisAnamnesis.findIndex((a: IPatientDiagnosisAnamnesis) => a.id === id);
      if (index > -1) {
        const idForDelete = d.patientDiagnosisAnamnesis[index].id;
        if (idForDelete) d.patientDiagnosisAnamnesisForDelete.push(idForDelete);
        d.patientDiagnosisAnamnesis.splice(index, 1);
      }
    });
  },
  addAnamnesis(state, diagnosisId: string) {
    const diagnosis = state.patient.patientDiagnosis.find((d: IPatientDiagnosis) => d.id === diagnosisId);
    if (diagnosis) {
      const anamnesis = new PatientDiagnosisAnamnesis();
      anamnesis.isEditMode = true;
      diagnosis.patientDiagnosisAnamnesis.push(anamnesis);
    }
  },
};

export default mutations;

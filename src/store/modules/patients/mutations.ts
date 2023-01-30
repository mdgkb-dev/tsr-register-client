import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';
import { MutationTree } from 'vuex';

import Disability from '@/classes/disability/Disability';
import Edv from '@/classes/disability/Edv';
import InsuranceCompanyToHuman from '@/classes/insuranceCompanies/InsuranceCompanyToHuman';
import MkbConcreteDiagnosis from '@/classes/mkb/MkbConcreteDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import Patient from '@/classes/patients/Patient';
import PatientDiagnosis from '@/classes/patients/PatientDiagnosis';
import PatientDiagnosisAnamnesis from '@/classes/patients/PatientDiagnosisAnamnesis';
import RegisterToPatient from '@/classes/RegisterToPatient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IDisability from '@/interfaces/disabilities/IDisability';
import IEdv from '@/interfaces/disabilities/IEdv';
import IDocument from '@/interfaces/documents/IDocument';
import IFileInfoToDocument from '@/interfaces/documents/IFileInfoToDocument';
import IFile from '@/interfaces/files/IFile';
import IFileInfo from '@/interfaces/files/IFileInfo';
import IHuman from '@/interfaces/IHuman';
import IInsuranceCompanyToHuman from '@/interfaces/insuranceCompanies/IInsuranceCompanyToHuman';
import IRegister from '@/interfaces/IRegister';
import IRegisterToPatient from '@/interfaces/IRegisterToPatient';
import IPatient from '@/interfaces/patients/IPatient';
import IPatientDiagnosis from '@/interfaces/patients/IPatientDiagnosis';
import IPatientDiagnosisAnamnesis from '@/interfaces/patients/IPatientDiagnosisAnamnesis';
import IPatientDrugRegimen from '@/interfaces/patients/IPatientDrugRegimen';
import IPatientsWithCount from '@/interfaces/patients/IPatientsWithCount';
import IRepresentative from '@/interfaces/representatives/IRepresentative';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import RemoveFromClass from '@/services/RemoveFromClass';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, patientsWithCount: IPatientsWithCount) {
    state.patients = patientsWithCount.patients.map((p: IPatient) => new Patient(p));
    state.count = patientsWithCount.count;
  },
  setAllHistory(state, patients: IPatient[]) {
    state.patientsHistory = patients.map((p: IPatient) => new Patient(p));
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
  addRegister(state, register: IRegister) {
    const registerToPatient = new RegisterToPatient({ register: register, registerId: register.id });
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
  addRepresentative(state, item?: IRepresentative) {
    const rtp = new RepresentativeToPatient();
    if (item) {
      rtp.representative = item;
    }
    state.patient.representativeToPatient.push(rtp);
    console.log(state.patient.representativeToPatient);
  },
  removeRepresentative(state, item: IRepresentativeToPatient): void {
    const index = state.patient.representativeToPatient.indexOf(item);
    if (index !== -1) state.patient.representativeToPatient.splice(index, 1);
    if (item.id) state.patient.representativeToPatientForDelete.push(item.id);
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
    diagnosis.editMode = true;
    state.patient.patientDiagnosis.push(diagnosis);
  },
  removeDiagnosis(state, id: string) {
    const index = state.patient.patientDiagnosis.findIndex((i: IPatientDiagnosis) => i.id === id);
    if (index !== -1) state.patient.patientDiagnosis.splice(index, 1);
    state.patient.patientDiagnosisForDelete.push(id);
  },
  removeDiagnosisByDiagnosisOrSubDiagnosisId(state, id: string) {
    const ids: string[] = [];
    const patientDiagnosis = state.patient.patientDiagnosis.forEach((d: IPatientDiagnosis, i: number) => {
      // console.log(id, [d.mkbDiagnosisId, d.mkbSubDiagnosisId, d.mkbConcreteDiagnosisId]);
      if ([d.mkbDiagnosisId, d.mkbSubDiagnosisId, d.mkbConcreteDiagnosisId].includes(id) && d.id) {
        ids.push(d.id);
      }
    });
    console.log();
    ids.forEach((id: string) => {
      const i = state.patient.patientDiagnosis.findIndex((d: IPatientDiagnosis) => d.id === id);
      console.log(i);
      RemoveFromClass(i, state.patient.patientDiagnosis, state.patient.patientDiagnosisForDelete);
    });
  },
  clearDiagnosis(state, id: string) {
    const diagnosis = state.patient.patientDiagnosis.find((d: IPatientDiagnosis) => d.id === id);
    if (diagnosis) {
      diagnosis.mkbDiagnosis = new MkbDiagnosis();
      diagnosis.mkbDiagnosisId = undefined;
      diagnosis.mkbSubDiagnosis = new MkbSubDiagnosis();
      diagnosis.mkbSubDiagnosisId = undefined;
      diagnosis.mkbConcreteDiagnosis = new MkbConcreteDiagnosis();
      diagnosis.mkbConcreteDiagnosisId = undefined;
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
  addPatientDrugRegimen(state, item: IPatientDrugRegimen) {
    state.patient.patientDrugRegimen.push(item);
  },
  removePatientDrugRegimen(state, id: string) {
    const i = state.patient.patientDrugRegimen.findIndex((item: IPatientDrugRegimen) => item.id === id);
    if (i > -1) state.patient.patientDrugRegimen.splice(i, 1);
    state.patient.patientDrugRegimenForDelete.push(id);
  },
  setEditMode(state, isEditMode: boolean) {
    state.isEditMode = isEditMode;
  },
};

export default mutations;

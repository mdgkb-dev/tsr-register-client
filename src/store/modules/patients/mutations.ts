import { MutationTree } from 'vuex';

import Patient from '@/classes/Patient';
import getBaseMutations from '@/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<Patient, State>(Patient),
  // setAllHistory(state, patients: Patient[]) {
  //   state.itemsHistory = patients.map((p: Patient) => new Patient(p));
  // },
  // setHuman(state, human: IHuman) {
  //   state.item.human = cloneDeep(human);
  // },
  // setFilteredPatients(state, patients: Patient[]) {
  //   state.filteredPatients = patients.map((p: Patient) => new Patient(p));
  // },
  // addInsurance(state) {
  //   state.item.human.insuranceCompanyToHuman.push(new InsuranceCompanyToHuman());
  // },
  // removeInsurance(state, item: InsuranceCompanyToHuman): void {
  //   const index = state.item.human.insuranceCompanyToHuman.indexOf(item);
  //   if (index > -1) state.item.human.insuranceCompanyToHuman.splice(index, 1);
  //   if (item.id) state.item.human.insuranceCompanyToHumanForDelete.push(item.id);
  // },
  // addRegister(state, register: IRegister) {
  //   const registerToPatient = new RegisterToPatient({ register: register, registerId: register.id });
  //   state.item.registerToPatient.push(registerToPatient);
  // },
  // removeRegister(state, registerId: string) {
  //   const index = state.item.registerToPatient.findIndex((i: IRegisterToPatient) => i.registerId === registerId);
  //   if (index > -1) {
  //     const idForDelete = state.item.registerToPatient[index].id;
  //     if (idForDelete) state.item.registerToPatientForDelete.push(idForDelete);
  //     state.item.registerToPatient.splice(index, 1);
  //   }
  // },
  // addRepresentative(state, item?: IRepresentative) {
  //   const rtp = new RepresentativeToPatient();
  //   if (item) {
  //     rtp.representative = item;
  //   }
  //   state.item.representativeToPatient.push(rtp);
  //   console.log(state.item.representativeToPatient);
  // },
  // removeRepresentative(state, item: IRepresentativeToPatient): void {
  //   const index = state.item.representativeToPatient.indexOf(item);
  //   if (index !== -1) state.item.representativeToPatient.splice(index, 1);
  //   if (item.id) state.item.representativeToPatientForDelete.push(item.id);
  // },
  // addHeightWeight(state) {
  //   state.item.heightWeight.push(new HeightWeight());
  // },
  // removeHeightWeight(state, item: HeightWeight) {
  //   const index = state.item.heightWeight.indexOf(item);
  //   if (index !== -1) state.item.heightWeight.splice(index, 1);
  //   if (item.id) state.item.heightWeightForDelete.push(item.id);
  // },
  // addChestCircumference(state) {
  //   state.item.chestCircumference.push(new Circumference());
  // },
  // removeChestCircumference(state, item: Circumference) {
  //   const index = state.item.chestCircumference.indexOf(item);
  //   if (index !== -1) state.item.chestCircumference.splice(index, 1);
  //   if (item.id) state.item.chestCircumferenceForDelete.push(item.id);
  // },
  // addHeadCircumference(state) {
  //   state.item.headCircumference.push(new Circumference());
  // },
  // removeHeadCircumference(state, item: Circumference) {
  //   const index = state.item.headCircumference.indexOf(item);
  //   if (index !== -1) state.item.headCircumference.splice(index, 1);
  //   if (item.id) state.item.headCircumferenceForDelete.push(item.id);
  // },
  // setEdvDateEnd(state, id: string) {
  //   state.item.disabilities = state.item.disabilities.map((disability: IDisability) => {
  //     disability.edvs = disability.edvs.map((i: IEdv) => {
  //       if (i.id === id && i.period) {
  //         const date = new Date(i.period.dateStart);
  //         date.setFullYear(date.getFullYear() + 1);
  //         i.period.dateEnd = date.toISOString();
  //         return i;
  //       }
  //       return i;
  //     });
  //     return disability;
  //   });
  // },

  // addDocument(state, item: IDocument) {
  //   state.item.human.documents.push(item);
  // },
  // removeDocument(state, id: string) {
  //   const i = state.item.human.documents.findIndex((item: IDocument) => item.id === id);
  //   if (i > -1) state.item.human.documents.splice(i, 1);
  //   state.item.human.documentsForDelete.push(id);
  // },
  // addDocumentsFiles(state, items: IFileInfoToDocument[]) {
  //   const i = state.item.human.documents.findIndex((doc: IDocument) => doc.id === items[0].documentId);
  //   if (i > -1) {
  //     state.item.human.documents[i].fileInfoToDocument = [...state.item.human.documents[i].fileInfoToDocument, ...items];
  //   }
  // },
  // removeFile(state, fileInfoToDocumentId: string) {
  //   state.item.human.documents.forEach((doc: IDocument) => {
  //     doc.fileInfoToDocument.forEach((fileInfoToDocument: IFileInfoToDocument, i: number) => {
  //       if (fileInfoToDocument.id === fileInfoToDocumentId) {
  //         doc.fileInfoToDocumentForDelete.push(fileInfoToDocumentId);
  //         doc.fileInfoToDocument.splice(i, 1);
  //       }
  //     });
  //   });
  // },
  // resetPatient(state) {
  //   state.item = new Patient();
  // },
  // setPhoto(state, file: IFileInfo) {
  //   state.item.human.photo = file;
  //   state.item.human.photoId = file.id;
  // },
  // setFileList(state, file: IFile) {
  //   if (!state.item.human.photo) return;
  //   state.item.human.photo.file = file.blob;
  //   if (state.item.human.photo.fileSystemPath) {
  //     state.photoFileList[0] = { name: state.item.human.photo.fileSystemPath, url: file.src };
  //   }
  // },
  // removePhoto(state) {
  //   state.item.human.photo = undefined;
  //   state.item.human.photoId = undefined;
  // },
  // addDiagnosis(state, patientDiagnosis?: IPatientDiagnosis) {
  //   if (patientDiagnosis) {
  //     state.item.patientDiagnosis.push(patientDiagnosis);
  //     return;
  //   }
  //   const diagnosis = new PatientDiagnosis();
  //   diagnosis.id = uuidv4();
  //   diagnosis.editMode = true;
  //   state.item.patientDiagnosis.push(diagnosis);
  // },
  // removeDiagnosis(state, id: string) {
  //   const index = state.item.patientDiagnosis.findIndex((i: IPatientDiagnosis) => i.id === id);
  //   if (index !== -1) state.item.patientDiagnosis.splice(index, 1);
  //   state.item.patientDiagnosisForDelete.push(id);
  // },
  // removeDiagnosisByDiagnosisOrSubDiagnosisId(state, id: string) {
  //   const ids: string[] = [];
  //   const patientDiagnosis = state.item.patientDiagnosis.forEach((d: IPatientDiagnosis, i: number) => {
  //     // console.log(id, [d.mkbDiagnosisId, d.mkbSubDiagnosisId, d.mkbConcreteDiagnosisId]);
  //     if ([d.mkbDiagnosisId, d.mkbSubDiagnosisId, d.mkbConcreteDiagnosisId].includes(id) && d.id) {
  //       ids.push(d.id);
  //     }
  //   });
  //   console.log();
  //   ids.forEach((id: string) => {
  //     const i = state.item.patientDiagnosis.findIndex((d: IPatientDiagnosis) => d.id === id);
  //     console.log(i);
  //     RemoveFromClass(i, state.item.patientDiagnosis, state.item.patientDiagnosisForDelete);
  //   });
  // },
  // clearDiagnosis(state, id: string) {
  //   const diagnosis = state.item.patientDiagnosis.find((d: IPatientDiagnosis) => d.id === id);
  //   if (diagnosis) {
  //     diagnosis.mkbDiagnosis = new MkbDiagnosis();
  //     diagnosis.mkbDiagnosisId = undefined;
  //     diagnosis.mkbSubDiagnosis = new MkbSubDiagnosis();
  //     diagnosis.mkbSubDiagnosisId = undefined;
  //     diagnosis.mkbConcreteDiagnosis = new MkbConcreteDiagnosis();
  //     diagnosis.mkbConcreteDiagnosisId = undefined;
  //   }
  // },
  // removeAnamnesis(state, id: string) {
  //   state.item.patientDiagnosis.forEach((d: IPatientDiagnosis) => {
  //     const index = d.patientDiagnosisAnamnesis.findIndex((a: IPatientDiagnosisAnamnesis) => a.id === id);
  //     if (index > -1) {
  //       const idForDelete = d.patientDiagnosisAnamnesis[index].id;
  //       if (idForDelete) d.patientDiagnosisAnamnesisForDelete.push(idForDelete);
  //       d.patientDiagnosisAnamnesis.splice(index, 1);
  //     }
  //   });
  // },
  // addAnamnesis(state, diagnosisId: string) {
  //   const diagnosis = state.item.patientDiagnosis.find((d: IPatientDiagnosis) => d.id === diagnosisId);
  //   if (diagnosis) {
  //     const anamnesis = new PatientDiagnosisAnamnesis();
  //     anamnesis.isEditMode = true;
  //     diagnosis.patientDiagnosisAnamnesis.push(anamnesis);
  //   }
  // },
  // addPatientDrugRegimen(state, item: IPatientDrugRegimen) {
  //   state.item.patientDrugRegimen.push(item);
  // },
  // removePatientDrugRegimen(state, id: string) {
  //   const i = state.item.patientDrugRegimen.findIndex((item: IPatientDrugRegimen) => item.id === id);
  //   if (i > -1) state.item.patientDrugRegimen.splice(i, 1);
  //   state.item.patientDrugRegimenForDelete.push(id);
  // },
  // setEditMode(state, isEditMode: boolean) {
  //   state.isEditMode = isEditMode;
  // },
};

export default mutations;

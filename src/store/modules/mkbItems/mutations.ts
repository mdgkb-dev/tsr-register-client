import { MutationTree } from 'vuex';

import MkbItem from '@/classes/MkbItem';
import getBaseMutations from '@/services/store/baseModule/baseMutations';

import { State } from './index';

const mutations: MutationTree<State> = {
  ...getBaseMutations<MkbItem, State>(MkbItem),
  // setAll(state, mkbClasses: IMkbClass[]) {
  //   state.mkbClasses = mkbClasses.map((m: IMkbClass) => new MkbClass(m));
  // },
  // setDiagnosis(state, mkbDiagnosis: IMkbDiagnosis[]) {
  //   state.mkbDiagnosis = mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
  // },
  // setConcreteDiagnosis(state, items: IMkbConcreteDiagnosis[]) {
  //   state.mkbConcreteDiagnosis = items.map((i: IMkbConcreteDiagnosis) => new MkbConcreteDiagnosis(i));
  // },
  // setSubDiagnosisBySearch(state, mkbSubDiagnosis: IMkbSubDiagnosis[]) {
  //   state.mkbSubDiagnosis = [];
  //   state.mkbFilteredConcreteDiagnosis = [];
  //   mkbSubDiagnosis.forEach((d: IMkbSubDiagnosis) => {
  //     state.mkbSubDiagnosis.push(new MkbSubDiagnosis(d));
  //     if (!d.mkbConcreteDiagnosis) {
  //       return;
  //     }
  //     d.mkbConcreteDiagnosis.forEach((sd: IMkbConcreteDiagnosis) => {
  //       state.mkbFilteredConcreteDiagnosis.push(new MkbConcreteDiagnosis(sd));
  //     });
  //   });
  // },
  // setFilteredSubDiagnosis(state, items: IMkbSubDiagnosis[]) {
  //   state.mkbFilteredSubDiagnosis = items;
  // },
  // setFilteredConcreteDiagnosis(state, items: IMkbConcreteDiagnosis[]) {
  //   state.mkbFilteredConcreteDiagnosis = items;
  // },
  // setFilteredDiagnosis(state, mkbDiagnosis: IMkbDiagnosis[]) {
  //   // state.mkbFilteredDiagnosis = [];
  //   // state.mkbFilteredSubDiagnosis = [];
  //   // state.mkbFilteredConcreteDiagnosis = [];
  //   mkbDiagnosis.forEach((d: IMkbDiagnosis) => {
  //     state.mkbFilteredDiagnosis.push(new MkbDiagnosis(d));
  //     if (!d.mkbSubDiagnosis) {
  //       return;
  //     }
  //     d.mkbSubDiagnosis.forEach((sd: IMkbSubDiagnosis) => {
  //       state.mkbFilteredSubDiagnosis.push(new MkbSubDiagnosis(sd));
  //       if (!sd.mkbConcreteDiagnosis) {
  //         return;
  //       }
  //       sd.mkbConcreteDiagnosis.forEach((cd: IMkbConcreteDiagnosis) => {
  //         state.mkbFilteredConcreteDiagnosis.push(new MkbConcreteDiagnosis(cd));
  //       });
  //     });
  //   });
  // },
  // setGroups(state, mkbDiagnosis: IMkbGroup[]) {
  //   state.mkbGroups = mkbDiagnosis.map((i: IMkbGroup) => new MkbGroup(i));
  // },
  // setSubDiagnosisByDiagnosisId(state, mkbSubDiagnosis: IMkbSubDiagnosis[]) {
  //   state.mkbSubDiagnosis = mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));
  // },
  // setGroupByClassId(state, mkbComposition: MkbComposition) {
  //   const groups = mkbComposition.mkbGroupAnswer.mkbGroups
  //     ? mkbComposition.mkbGroupAnswer.mkbGroups.map((m: IMkbGroup) => new MkbGroup(m))
  //     : undefined;
  //   const diagnosis = mkbComposition.mkbGroupAnswer.mkbDiagnosis
  //     ? mkbComposition.mkbGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d))
  //     : undefined;
  //   if (!state.mkbClasses) return;
  //   const i = state.mkbClasses.findIndex((item: IMkbClass) => item.id === mkbComposition.mkbIdSet.classId);
  //   if (i >= 0 && state.mkbClasses) {
  //     if (groups) {
  //       state.mkbClasses[i].mkbGroups = groups;
  //     }
  //     if (diagnosis) {
  //       state.mkbClasses[i].mkbDiagnosis = diagnosis;
  //     }
  //   }
  // },
  //
  // setGroupChildren(state, mkbComposition: MkbComposition) {
  //   const subGroups = mkbComposition.mkbSubGroupAnswer.mkbSubGroups.map((m: IMkbSubGroup) => new MkbSubGroup(m));
  //   const diagnosis = mkbComposition.mkbSubGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
  //   const classI = state.mkbClasses.findIndex((item: IMkbClass) => item.id === mkbComposition.mkbIdSet.classId);
  //   const groupId = state.mkbClasses[classI].mkbGroups.findIndex((i: IMkbGroup) => i.id === mkbComposition.mkbIdSet.groupId);
  //
  //   state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups = subGroups;
  //   state.mkbClasses[classI].mkbGroups[groupId].mkbDiagnosis = diagnosis;
  // },
  //
  // setSubGroupChildren: (state, mkbComposition: MkbComposition) => {
  //   const diagnosis = mkbComposition.mkbSubSubGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
  //   const classI = state.mkbClasses.findIndex((item: IMkbClass) => item.id === mkbComposition.mkbIdSet.classId);
  //   const groupId = state.mkbClasses[classI].mkbGroups.findIndex((i: IMkbGroup) => i.id === mkbComposition.mkbIdSet.groupId);
  //   const subGroupId = state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups.findIndex(
  //     (i: IMkbSubGroup) => i.id === mkbComposition.mkbIdSet.subGroupId
  //   );
  //   state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups[subGroupId].mkbDiagnosis = diagnosis;
  // },
  //
  // setSubDiagnosis: (state, mkbComposition: MkbComposition) => {
  //   const mkbSubDiagnosis = mkbComposition.mkbSubDiagnosisAnswer.mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));
  //
  //   const mkbClass = state.mkbClasses.find((m: IMkbClass) => m.id === mkbComposition.mkbIdSet.classId);
  //   if (!mkbClass) return;
  //
  //   let diagnosis = mkbClass.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId);
  //   if (diagnosis) {
  //     diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
  //     return;
  //   }
  //
  //   const mkbGroup = mkbClass.mkbGroups.find((g: IMkbGroup) => g.id === mkbComposition.mkbIdSet.groupId);
  //   if (!mkbGroup) return;
  //
  //   diagnosis = mkbGroup.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId);
  //   if (diagnosis) {
  //     diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
  //     return;
  //   }
  //
  //   const subGroup = mkbGroup.mkbSubGroups.find((m: IMkbSubGroup) => m.id === mkbComposition.mkbIdSet.subGroupId);
  //   diagnosis = subGroup ? subGroup.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId) : undefined;
  //   if (diagnosis) {
  //     diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
  //   }
  // },
  // setConcreteDiagnosisFromComposition: (state, mkbComposition: MkbComposition) => {
  //   const mkbConcreteDiagnosis = mkbComposition.mkbConcreteDiagnosisAnswer.mkbConcreteDiagnoses.map(
  //     (d: IMkbConcreteDiagnosis) => new MkbConcreteDiagnosis(d)
  //   );
  //   const mkbClass = state.mkbClasses.find((m: IMkbClass) => m.id === mkbComposition.mkbIdSet.classId);
  //   if (!mkbClass) {
  //     return;
  //   }
  //   const diagnosis = mkbClass.getAllDiagnosis();
  //   const d = diagnosis.find((dd: IMkbDiagnosis) => dd.id === mkbComposition.mkbIdSet.diagnosisId);
  //   if (!d) {
  //     return;
  //   }
  //   const subDiagnosis = d.mkbSubDiagnosis.find((g: IMkbSubDiagnosis) => g.id === mkbComposition.mkbIdSet.subDiagnosisId);
  //   if (!subDiagnosis) {
  //     return;
  //   }
  //   subDiagnosis.mkbConcreteDiagnosis = mkbConcreteDiagnosis;
  // },
  //
  // setMkbClass(state, item: IMkbClass) {
  //   state.mkbClass = new MkbClass(item);
  // },
  // setMkbElement(state, item: IMkbElement) {
  //   state.mkbElement = new MkbElement(item);
  // },
};

export default mutations;

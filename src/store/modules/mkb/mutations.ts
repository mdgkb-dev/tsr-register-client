import { MutationTree } from 'vuex';

import MkbComposition from '@/classes/mkb/MkbComposition';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import MkbCLass from '@/classes/mkb/MkbСlass';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, mkbClasses: IMkbClass[]) {
    state.mkbClasses = mkbClasses.map((m: IMkbClass) => new MkbCLass(m));
  },
  setDiagnosis(state, mkbDiagnosis: IMkbDiagnosis[]) {
    state.mkbDiagnosis = mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
  },
  setFilteredDiagnosis(state, mkbDiagnosis: IMkbDiagnosis[]) {
    state.mkbFilteredDiagnosis = mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
  },
  setGroups(state, mkbDiagnosis: IMkbGroup[]) {
    state.mkbGroups = mkbDiagnosis.map((i: IMkbGroup) => new MkbGroup(i));
  },
  setSubDiagnosisByDiagnosisId(state, mkbSubDiagnosis: IMkbSubDiagnosis[]) {
    state.mkbSubDiagnosis = mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));
  },
  setGroupByClassId(state, mkbComposition: MkbComposition) {
    const groups = mkbComposition.mkbGroupAnswer.mkbGroups
      ? mkbComposition.mkbGroupAnswer.mkbGroups.map((m: IMkbGroup) => new MkbGroup(m))
      : undefined;
    const diagnosis = mkbComposition.mkbGroupAnswer.mkbDiagnosis
      ? mkbComposition.mkbGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d))
      : undefined;
    if (!state.mkbClasses) return;
    const i = state.mkbClasses.findIndex((item: any) => item.id === mkbComposition.mkbIdSet.classId);
    if (i >= 0 && state.mkbClasses) {
      if (groups) {
        state.mkbClasses[i].mkbGroups = groups;
      }
      if (diagnosis) {
        state.mkbClasses[i].mkbDiagnosis = diagnosis;
      }
    }
  },

  setGroupChildren(state, mkbComposition: MkbComposition) {
    const subGroups = mkbComposition.mkbSubGroupAnswer.mkbSubGroups.map((m: IMkbSubGroup) => new MkbSubGroup(m));
    const diagnosis = mkbComposition.mkbSubGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
    const classI = state.mkbClasses.findIndex((item: any) => item.id === mkbComposition.mkbIdSet.classId);
    const groupId = state.mkbClasses[classI].mkbGroups.findIndex((i: any) => i.id === mkbComposition.mkbIdSet.groupId);

    state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups = subGroups;
    state.mkbClasses[classI].mkbGroups[groupId].mkbDiagnosis = diagnosis;
  },

  setSubGroupChildren: (state, mkbComposition: MkbComposition) => {
    const diagnosis = mkbComposition.mkbSubSubGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
    const classI = state.mkbClasses.findIndex((item: any) => item.id === mkbComposition.mkbIdSet.classId);
    const groupId = state.mkbClasses[classI].mkbGroups.findIndex((i: any) => i.id === mkbComposition.mkbIdSet.groupId);
    const subGroupId = state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups.findIndex(
      (i: IMkbSubGroup) => i.id === mkbComposition.mkbIdSet.subGroupId
    );
    state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups[subGroupId].mkbDiagnosis = diagnosis;
  },

  setSubDiagnosis: (state, mkbComposition: MkbComposition) => {
    const mkbSubDiagnosis = mkbComposition.mkbSubDiagnosisAnswer.mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));

    const mkbClass = state.mkbClasses.find((m: IMkbClass) => m.id === mkbComposition.mkbIdSet.classId);
    if (!mkbClass) return;

    let diagnosis = mkbClass.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId);
    if (diagnosis) {
      diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
      return;
    }

    const mkbGroup = mkbClass.mkbGroups.find((g: IMkbGroup) => g.id === mkbComposition.mkbIdSet.groupId);
    if (!mkbGroup) return;

    diagnosis = mkbGroup.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId);
    if (diagnosis) {
      diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
      return;
    }

    const subGroup = mkbGroup.mkbSubGroups.find((m: IMkbSubGroup) => m.id === mkbComposition.mkbIdSet.subGroupId);
    diagnosis = subGroup ? subGroup.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId) : undefined;
    if (diagnosis) {
      diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
    }
  },

  // updateRelevant: (state, payload) => {
  //   let item;
  //   Object.values(state).forEach((group: any) => {
  //     item = group.find((i: any) => i.id === payload.id);
  //   });
  //   if (item) {
  //     Object.assign(item, payload);
  //   }
  // },
};

export default mutations;

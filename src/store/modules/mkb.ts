import HttpClient from '@/services/HttpClient';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import MkbCLass from '@/classes/mkb/MkbСlass';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import MkbGroup from '@/classes/mkb/MkbGroup';
import IMkbSubGroup from '@/interfaces/mkb/IMkbSubGroup';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import MkbComposition from '@/classes/mkb/MkbComposition';

const httpClient = new HttpClient('mkb');

export default {
  namespaced: true,
  state: {
    mkbClasses: [],
  },
  getters: {
    mkbClasses: (state: any): IMkbClass[] => state.mkbClasses,
  },
  mutations: {
    setAll: (state: any, mkbClasses: IMkbClass[]) => {
      state.mkbClasses = mkbClasses.map((m: IMkbClass) => new MkbCLass(m));
    },
    setGroupByClassId: (state: any, mkbComposition: MkbComposition) => {
      const groups = mkbComposition.mkbGroupAnswer.mkbGroups ? mkbComposition.mkbGroupAnswer.mkbGroups.map((m: IMkbGroup) => new MkbGroup(m)) : undefined;
      const diagnosis = mkbComposition.mkbGroupAnswer.mkbDiagnosis
        ? mkbComposition.mkbGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d))
        : undefined;

      const i = state.mkbClasses.findIndex((item: any) => item.id === mkbComposition.mkbIdSet.classId);
      if (i >= 0 && state.mkbClasses) {
        state.mkbClasses[i].mkbGroups = groups;
        state.mkbClasses[i].mkbDiagnosis = diagnosis;
      }
    },

    setGroupChildren: (state: any, mkbComposition: MkbComposition) => {
      const subGroups = mkbComposition.mkbSubGroupAnswer.mkbSubGroups.map((m: IMkbSubGroup) => new MkbSubGroup(m));
      const diagnosis = mkbComposition.mkbSubGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
      const classI = state.mkbClasses.findIndex((item: any) => item.id === mkbComposition.mkbIdSet.classId);
      const groupId = state.mkbClasses[classI].mkbGroups.findIndex((i: any) => i.id === mkbComposition.mkbIdSet.groupId);

      state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups = subGroups;
      state.mkbClasses[classI].mkbGroups[groupId].mkbDiagnosis = diagnosis;
    },

    setSubGroupChildren: (state: any, mkbComposition: MkbComposition) => {
      const diagnosis = mkbComposition.mkbSubSubGroupAnswer.mkbDiagnosis.map((d: IMkbDiagnosis) => new MkbDiagnosis(d));
      const classI = state.mkbClasses.findIndex((item: any) => item.id === mkbComposition.mkbIdSet.classId);
      const groupId = state.mkbClasses[classI].mkbGroups.findIndex((i: any) => i.id === mkbComposition.mkbIdSet.groupId);
      const subGroupId = state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups.findIndex((i: IMkbSubGroup) => i.id === mkbComposition.mkbIdSet.subGroupId);
      state.mkbClasses[classI].mkbGroups[groupId].mkbSubGroups[subGroupId].mkbDiagnosis = diagnosis;
    },

    setSubDiagnosis: (state: any, mkbComposition: MkbComposition) => {
      const mkbSubDiagnosis = mkbComposition.mkbSubDiagnosisAnswer.mkbSubDiagnosis.map((d: IMkbSubDiagnosis) => new MkbSubDiagnosis(d));

      const mkbClass = state.mkbClasses.find((m: IMkbClass) => m.id === mkbComposition.mkbIdSet.classId);
      if (!mkbClass) {
        return;
      }
      let diagnosis = mkbClass.getDiagnosis(mkbComposition.mkbIdSet.diagnosisId);
      if (diagnosis) {
        diagnosis.mkbSubDiagnosis = mkbSubDiagnosis;
        return;
      }

      const mkbGroup = mkbClass.mkbGroups.find((g: IMkbGroup) => g.id === mkbComposition.mkbIdSet.groupId);
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
  },
  actions: {
    getAllMkbClasses: async (context: any): Promise<void> => {
      context.commit('setAll', await httpClient.get());
    },
    getGroupById: async (context: any, idSet: IMkbIdSet): Promise<void> => {
      const res: MkbComposition = new MkbComposition();
      res.mkbGroupAnswer = await httpClient.get(`groups/${idSet.classId}`);
      res.mkbIdSet = idSet;
      context.commit('setGroupByClassId', res);
    },
    getSubGroupById: async (context: any, idSet: MkbIdSet): Promise<void> => {
      const res: MkbComposition = new MkbComposition();
      res.mkbSubGroupAnswer = await httpClient.get(`sub-groups/${idSet.groupId}`);
      res.mkbIdSet = idSet;
      context.commit('setGroupChildren', res);
    },
    getSubSubGroupById: async (context: any, idSet: MkbIdSet): Promise<void> => {
      const res: MkbComposition = new MkbComposition();
      res.mkbSubSubGroupAnswer = await httpClient.get(`sub-sub-groups/${idSet.subGroupId}`);
      res.mkbIdSet = idSet;
      context.commit('setSubGroupChildren', res);
    },
    getSubDiagnosisByDiagnosisId: async (context: any, idSet: MkbIdSet): Promise<void> => {
      const res: MkbComposition = new MkbComposition();
      res.mkbSubDiagnosisAnswer = await httpClient.get(`diagnosis/${idSet.diagnosisId}`);
      res.mkbIdSet = idSet;
      context.commit('setSubDiagnosis', res);
    },
  },
};

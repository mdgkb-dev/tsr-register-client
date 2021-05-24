import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import { State } from './state';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import MkbComposition from '@/classes/mkb/MkbComposition';
import MkbIdSet from '@/classes/mkb/MkbIdSet';

const httpClient = new HttpClient('mkb');

const actions: ActionTree<State, RootState> = {
  getAllMkbClasses: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  getGroupById: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbGroupAnswer = await httpClient.get(`groups/${idSet.classId}`);
    res.mkbIdSet = idSet;
    commit('setGroupByClassId', res);
  },
  getSubGroupById: async ({ commit }, idSet: MkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbSubGroupAnswer = await httpClient.get(`sub-groups/${idSet.groupId}`);
    res.mkbIdSet = idSet;
    commit('setGroupChildren', res);
  },
  getSubSubGroupById: async ({ commit }, idSet: MkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbSubSubGroupAnswer = await httpClient.get(`sub-sub-groups/${idSet.subGroupId}`);
    res.mkbIdSet = idSet;
    commit('setSubGroupChildren', res);
  },
  getSubDiagnosisByDiagnosisId: async ({ commit }, idSet: MkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbSubDiagnosisAnswer.mkbSubDiagnosis = await httpClient.get(`diagnosis/${idSet.diagnosisId}`);
    res.mkbIdSet = idSet;
    commit('setSubDiagnosis', res);
  },
  searchDiagnosis: async ({ commit }, query: MkbIdSet): Promise<void> => {
    commit('setDiagnosis', await httpClient.get(`diagnosis?query=${query}`));
  },
  searchSubDiagnosis: async ({ commit }, diagnosisId: string): Promise<void> => {
    console.log('diagnosisId', diagnosisId);
    commit('setSubDiagnosisByDiagnosisId', await httpClient.get(`diagnosis/${diagnosisId}`));
  },
};

export default actions;

import { ActionTree } from 'vuex';
import { RootState } from '@/store/types';
import HttpClient from '@/services/HttpClient';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import MkbComposition from '@/classes/mkb/MkbComposition';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import { State } from './state';

const httpClient = new HttpClient('mkb');

const actions: ActionTree<State, RootState> = {
  getAllMkbClasses: async ({ commit }): Promise<void> => {
    commit('setAll', await httpClient.get());
  },
  getGroupById: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbGroupAnswer = await httpClient.get({ query: `groups/${idSet.classId}` });
    res.mkbIdSet = idSet;
    commit('setGroupByClassId', res);
  },
  getSubGroupById: async ({ commit }, idSet: MkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbSubGroupAnswer = await httpClient.get({ query: `sub-groups/${idSet.groupId}` });
    res.mkbIdSet = idSet;
    commit('setGroupChildren', res);
  },
  getSubSubGroupById: async ({ commit }, idSet: MkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbSubSubGroupAnswer = await httpClient.get({ query: `sub-sub-groups/${idSet.subGroupId}` });
    res.mkbIdSet = idSet;
    commit('setSubGroupChildren', res);
  },
  getSubDiagnosisByDiagnosisId: async ({ commit }, idSet: MkbIdSet): Promise<void> => {
    const res: MkbComposition = new MkbComposition();
    res.mkbSubDiagnosisAnswer.mkbSubDiagnosis = await httpClient.get({ query: `diagnosis/${idSet.diagnosisId}` });
    res.mkbIdSet = idSet;
    commit('setSubDiagnosis', res);
  },
  searchDiagnosis: async ({ commit }, query: MkbIdSet): Promise<void> => {
    commit('setDiagnosis', await httpClient.get({ query: `diagnosis?query=${query}` }));
  },
  searchSubDiagnosis: async ({ commit }, diagnosisId: string): Promise<void> => {
    commit('setSubDiagnosisByDiagnosisId', await httpClient.get({ query: `diagnosis/${diagnosisId}` }));
  },
  updateRelevant: async ({ commit }, data: any): Promise<void> => {
    await httpClient.get({ query: `${data.id}?relevant=${data.relevant}&group=${data.mkbGroupName}` });
  },
};

export default actions;

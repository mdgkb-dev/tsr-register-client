import { ActionTree } from 'vuex';

import MkbComposition from '@/classes/mkb/MkbComposition';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import MkbGroup from '@/classes/mkb/MkbGroup';
import MkbIdSet from '@/classes/mkb/MkbIdSet';
import MkbSubDiagnosis from '@/classes/mkb/MkbSubDiagnosis';
import MkbSubGroup from '@/classes/mkb/MkbSubGroup';
import MkbSubSubGroup from '@/classes/mkb/MkbSubSubGroup';
import MkbClass from '@/classes/mkb/MkbСlass';
import IMkbIdSet from '@/interfaces/mkb/IMkbIdSet';
import HttpClient from '@/services/HttpClient';
import RootState from '@/store/types';

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
  getDiagnosisByGroupId: async ({ commit }, groupId: string): Promise<void> => {
    commit('setFilteredDiagnosis', await httpClient.get({ query: `diagnosis/byGroupId/${groupId}` }));
  },
  searchGroups: async ({ commit }, query: string): Promise<void> => {
    if (query.length === 0) {
      commit('setFilteredDiagnosis', []);
      return;
    }
    commit('setGroups', await httpClient.get({ query: `groups?query=${query}` }));
  },
  searchDiagnosis: async ({ commit }, query: string): Promise<void> => {
    commit('setDiagnosis', await httpClient.get({ query: `diagnosis?query=${query}` }));
  },
  searchSubDiagnosis: async ({ commit }, diagnosisId: string): Promise<void> => {
    commit('setSubDiagnosisByDiagnosisId', await httpClient.get({ query: `diagnosis/${diagnosisId}` }));
  },
  updateRelevant: async (_, mkb: MkbClass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis): Promise<void> => {
    await httpClient.put({ query: `${mkb.id}?mkbType=${mkb.constructor.name}` });
  },
  updateName: async (_, mkb: MkbClass | MkbGroup | MkbSubGroup | MkbSubSubGroup | MkbDiagnosis | MkbSubDiagnosis): Promise<void> => {
    await httpClient.put({ payload: mkb, query: `${mkb.id}?mkbType=${mkb.constructor.name}&update=name` });
  },
};

export default actions;

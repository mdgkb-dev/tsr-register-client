import { ActionTree } from 'vuex';

import MkbItem from '@/classes/MkbItem';
import HttpClient from '@/services/HttpClient';
import getBaseActions from '@/store/baseModule/baseActions';
import RootState from '@/store/types';

import { State } from './index';

const httpClient = new HttpClient('mkb-items');

const actions: ActionTree<State, RootState> = {
  ...getBaseActions<MkbItem, State>(httpClient),
  // getAllMkbClasses: async ({ commit }): Promise<void> => {
  //   commit('setAll', await httpClient.get<IMkbClass[]>());
  // },
  // getGroupById: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
  //   const res: MkbComposition = new MkbComposition();
  //   const mkbAns = await httpClient.get<MkbGroupAnswer>({ query: `groups/${idSet.classId}` });
  //   if (!mkbAns) {
  //     return;
  //   }
  //   res.mkbGroupAnswer = mkbAns;
  //   res.mkbIdSet = idSet;
  //   commit('setGroupByClassId', res);
  // },
  // getSubGroupById: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
  //   const res: MkbComposition = new MkbComposition();
  //   const mkbAns = await httpClient.get<MkbSubGroupAnswer>({ query: `sub-groups/${idSet.groupId}` });
  //   if (!mkbAns) {
  //     return;
  //   }
  //   res.mkbSubGroupAnswer = mkbAns;
  //
  //   res.mkbIdSet = idSet;
  //   commit('setGroupChildren', res);
  // },
  // getSubSubGroupById: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
  //   const res: MkbComposition = new MkbComposition();
  //   const ans = await httpClient.get<MkbSubSubGroupAnswer>({ query: `sub-sub-groups/${idSet.subGroupId}` });
  //   if (ans) {
  //     res.mkbSubSubGroupAnswer = ans;
  //   }
  //
  //   res.mkbIdSet = idSet;
  //   commit('setSubGroupChildren', res);
  // },
  // getSubDiagnosisByDiagnosisId: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
  //   const res: MkbComposition = new MkbComposition();
  //   const ans = await httpClient.get<IMkbSubDiagnosis[]>({ query: `diagnosis/${idSet.diagnosisId}` });
  //   if (ans) {
  //     res.mkbSubDiagnosisAnswer.mkbSubDiagnosis = ans;
  //   }
  //   res.mkbIdSet = idSet;
  //   commit('setSubDiagnosis', res);
  // },
  // getConcreteDiagnosisBySubDiagnosisId: async ({ commit }, idSet: IMkbIdSet): Promise<void> => {
  //   const res: MkbComposition = new MkbComposition();
  //   const ans = await httpClient.get<IMkbConcreteDiagnosis[]>({ query: `concrete-diagnosis/${idSet.subDiagnosisId}` });
  //   if (ans) {
  //     res.mkbConcreteDiagnosisAnswer.mkbConcreteDiagnoses = ans;
  //   }
  //   res.mkbIdSet = idSet;
  //   commit('setConcreteDiagnosisFromComposition', res);
  // },
  // getDiagnosisByGroupId: async ({ commit }, groupId: string): Promise<void> => {
  //   commit('setFilteredDiagnosis', await httpClient.get<IMkbDiagnosis[]>({ query: `diagnosis/byGroupId/${groupId}` }));
  // },
  // searchGroups: async ({ commit }, query: string): Promise<void> => {
  //   if (query.length === 0) {
  //     commit('setFilteredDiagnosis', []);
  //     return;
  //   }
  //   commit('setGroups', await httpClient.get<IMkbGroup>({ query: `groups?query=${query}` }));
  // },
  // searchDiagnosis: async ({ commit }, query: string): Promise<void> => {
  //   commit('setDiagnosis', await httpClient.get<IMkbDiagnosis>({ query: `diagnosis?query=${query}` }));
  // },
  // searchSubDiagnosis: async ({ commit }, query: string): Promise<void> => {
  //   commit('setSubDiagnosisBySearch', await httpClient.get<IMkbSubDiagnosis>({ query: `sub-diagnosis?query=${query}` }));
  // },
  // searchConcreteDiagnosis: async ({ commit }, query: string): Promise<void> => {
  //   commit('setConcreteDiagnosis', await httpClient.get<IMkbConcreteDiagnosis>({ query: `concrete-diagnosis?query=${query}` }));
  // },
  // searchSubDiagnosisByDiagnosisId: async ({ commit }, diagnosisId: string): Promise<void> => {
  //   commit('setSubDiagnosisByDiagnosisId', await httpClient.get<IMkbSubDiagnosis[]>({ query: `diagnosis/${diagnosisId}` }));
  // },
  // updateRelevant: async (_, mkb: IMkbSuperSet): Promise<void> => {
  //   await httpClient.put<IMkbSuperSet, IMkbSuperSet>({ query: `${mkb.id}?mkbType=${mkb.constructor.name}` });
  // },
  // updateName: async (_, mkb: IMkbSuperSet): Promise<void> => {
  //   await httpClient.put<IMkbSuperSet, IMkbSuperSet>({ payload: mkb, query: `${mkb.id}?mkbType=${mkb.constructor.name}&update=name` });
  // },
  // selectMkbElement: async ({ commit }, id: string): Promise<void> => {
  //   const res = await httpClient.get<IMkbClassWithMkbElement>({ query: `select-mkb-element/${id}` });
  //   if (!res) {
  //     return;
  //   }
  //   commit('setMkbClass', res.mkbClass);
  //   commit('setMkbElement', res.mkbElement);
  // },
  tree: async (_): Promise<void> => {
    await httpClient.get({ query: `tree` });
  },
};

export default actions;

import { GetterTree } from 'vuex';

import MkbItem from '@/classes/MkbItem';
import getBaseGetters from '@/services/store/baseModule/baseGetters';
import RootState from '@/store/types';

import { State } from './index';

const getters: GetterTree<State, RootState> = {
  ...getBaseGetters<MkbItem, State>(),
  // mkbClasses(state): IMkbClass[] | undefined {
  //   return state.mkbClasses;
  // },
  // mkbGroups(state): IMkbGroup[] | undefined {
  //   return state.mkbGroups;
  // },
  // filteredDiagnosis(state): IMkbDiagnosis[] | undefined {
  //   return state.mkbFilteredDiagnosis;
  // },
  // filteredSubDiagnosis(state): IMkbSubDiagnosis[] | undefined {
  //   return state.mkbFilteredSubDiagnosis;
  // },
  // filteredConcreteDiagnosis(state): IMkbConcreteDiagnosis[] | undefined {
  //   return state.mkbFilteredConcreteDiagnosis;
  // },
  // mkbDiagnosis(state): IMkbDiagnosis[] | undefined {
  //   return state.mkbDiagnosis;
  // },
  // mkbConcreteDiagnosis(state): IMkbConcreteDiagnosis[] | undefined {
  //   return state.mkbConcreteDiagnosis;
  // },
  // mkbSubDiagnosis(state): IMkbSubDiagnosis[] | undefined {
  //   return state.mkbSubDiagnosis;
  // },
  // mkbClass(state): IMkbClass {
  //   return state.mkbClass;
  // },
  // mkbElement(state): IMkbElement {
  //   return state.mkbElement;
  // },
};

export default getters;

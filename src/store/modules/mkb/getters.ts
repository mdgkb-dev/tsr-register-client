import { GetterTree } from 'vuex';

import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbConcreteDiagnosis from '@/interfaces/mkb/IMkbConcreteDiagnosis';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbElement from '@/interfaces/mkb/IMkbElement';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  mkbClasses(state): IMkbClass[] | undefined {
    return state.mkbClasses;
  },
  mkbGroups(state): IMkbGroup[] | undefined {
    return state.mkbGroups;
  },
  filteredDiagnosis(state): IMkbDiagnosis[] | undefined {
    return state.mkbFilteredDiagnosis;
  },
  filteredSubDiagnosis(state): IMkbSubDiagnosis[] | undefined {
    return state.mkbFilteredSubDiagnosis;
  },
  filteredConcreteDiagnosis(state): IMkbConcreteDiagnosis[] | undefined {
    return state.mkbFilteredConcreteDiagnosis;
  },
  mkbDiagnosis(state): IMkbDiagnosis[] | undefined {
    return state.mkbDiagnosis;
  },
  mkbConcreteDiagnosis(state): IMkbConcreteDiagnosis[] | undefined {
    return state.mkbConcreteDiagnosis;
  },
  mkbSubDiagnosis(state): IMkbSubDiagnosis[] | undefined {
    return state.mkbSubDiagnosis;
  },
  mkbClass(state): IMkbClass {
    return state.mkbClass;
  },
  mkbElement(state): IMkbElement {
    return state.mkbElement;
  },
};

export default getters;

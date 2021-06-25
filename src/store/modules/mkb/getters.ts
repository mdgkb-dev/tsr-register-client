import { GetterTree } from 'vuex';

import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbGroup from '@/interfaces/mkb/IMkbGroup';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import { RootState } from '@/store/types';

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
  mkbDiagnosis(state): IMkbDiagnosis[] | undefined {
    return state.mkbDiagnosis;
  },
  mkbSubDiagnosis(state): IMkbSubDiagnosis[] | undefined {
    return state.mkbSubDiagnosis;
  },
};

export default getters;

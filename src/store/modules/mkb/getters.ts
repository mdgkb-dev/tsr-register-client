import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IMkbClass from '@/interfaces/mkb/IMkbClass';
import IMkbDiagnosis from '@/interfaces/mkb/IMkbDiagnosis';
import IMkbSubDiagnosis from '@/interfaces/mkb/IMkbSubDiagnosis';
import { State } from './state';

const getters: GetterTree<State, RootState> = {
  mkbClasses(state): IMkbClass[] | undefined {
    return state.mkbClasses;
  },
  mkbDiagnosis(state): IMkbDiagnosis[] | undefined {
    return state.mkbDiagnosis;
  },
  mkbSubDiagnosis(state): IMkbSubDiagnosis[] | undefined {
    return state.mkbSubDiagnosis;
  },
};

export default getters;

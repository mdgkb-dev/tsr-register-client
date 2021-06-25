import { GetterTree } from 'vuex';

import IPatient from '@/interfaces/patients/IPatient';
import { RootState } from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  patients(state): IPatient[] | undefined {
    return state.patients;
  },
  patient(state): IPatient | undefined {
    return state.patient;
  },
  getById(state, id: string): IPatient | undefined {
    return state.patients.find((item: IPatient) => item.id === id);
  },
};

export default getters;

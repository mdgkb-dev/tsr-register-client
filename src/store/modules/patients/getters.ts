import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import { State } from './state';
import IPatient from '@/interfaces/patients/IPatient';

const getters: GetterTree<State, RootState> = {
  patients(state): IPatient[] | undefined {
    return state.patients;
  },
  patient(state): IPatient | undefined {
    return state.patient;
  },
  getById(state, id: number): IPatient | undefined {
    return state.patients.find((item: any) => item.id === id);
  },
};

export default getters;

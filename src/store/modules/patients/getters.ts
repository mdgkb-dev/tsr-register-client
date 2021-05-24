import { GetterTree } from 'vuex';
import { RootState } from '@/store/types';
import IPatient from '@/interfaces/patients/IPatient';
import { State } from './state';

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

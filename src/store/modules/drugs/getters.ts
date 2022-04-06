import { GetterTree } from 'vuex';

import IDrug from '@/interfaces/drugs/IDrug';
import IDrugDiagnosis from '@/interfaces/drugs/IDrugDiagnosis';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import RootState from '@/store/types';

import { State } from './state';

const getters: GetterTree<State, RootState> = {
  drugs(state): IDrug[] {
    return state.drugs;
  },
  drug(state): IDrug {
    return state.drug;
  },
  diagnosis(state): IDrugDiagnosis[] {
    return state.drug.drugsDiagnosis;
  },
  getDrugRegimensByDrugId(state): (id: string) => IDrugRegimen[] | undefined {
    return (id: string): IDrugRegimen[] | undefined => state.drugs.find((item: IDrug) => item.id === id)?.drugRegimens;
  },
  getDrugById(state): (id: string) => IDrug | undefined {
    return (id: string): IDrug | undefined => state.drugs.find((item: IDrug) => item.id === id);
  },
  getDrugRegimenByDrugId(state): (drugId: string, drugRegimenId: string) => IDrugRegimen | undefined {
    return (drugId: string, drugRegimenId: string): IDrugRegimen | undefined => {
      const drug = state.drugs.find((item: IDrug) => item.id === drugId);
      return drug?.drugRegimens.find((item: IDrugRegimen) => item.id === drugRegimenId);
    };
  },
  activeCollapseName(state): string {
    return state.activeCollapseName;
  },
};

export default getters;

import { MutationTree } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import DrugDiagnosis from '@/classes/drugs/DrugDiagnosis';
import MkbDiagnosis from '@/classes/mkb/MkbDiagnosis';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugDiagnosis from '@/interfaces/drugs/IDrugDiagnosis';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';
import IDrugRegimenBlockItem from '@/interfaces/drugs/IDrugRegimenBlockItem';

import { State } from './state';

const mutations: MutationTree<State> = {
  setAll(state, drugs: IDrug[]) {
    state.drugs = drugs.map((i: IDrug) => new Drug(i));
  },
  set(state, drug: IDrug) {
    state.drug = new Drug(drug);
  },
  create(state, payload: IDrug) {
    state.drugs.push(new Drug(payload));
  },
  update(state, payload: IDrug) {
    const item = state.drugs.find((i: IDrug) => i.id === payload.id);
    if (item) {
      Object.assign(item, payload);
    }
  },
  delete(state, id: string) {
    const i = state.drugs.findIndex((item: IDrug) => item.id === id);
    state.drugs.splice(i, 1);
  },
  setActiveCollapseName(state, index: string) {
    state.activeCollapseName = index;
  },
  // For drugRegimenBlocks and drugRegimenBlockItems
  updateOrder(state) {
    state.drug.drugRegimens = state.drug.drugRegimens.map((drugRegimen: IDrugRegimen) => {
      drugRegimen.drugRegimenBlocks = drugRegimen.drugRegimenBlocks.map(
        (drugRegimenBlock: IDrugRegimenBlock, drugRegimenBlockIndex: number) => {
          drugRegimenBlock.orderItem = drugRegimenBlockIndex;
          drugRegimenBlock.drugRegimenBlockItems = drugRegimenBlock.drugRegimenBlockItems.map(
            (drugRegimenBlockItem: IDrugRegimenBlockItem, drugRegimenBlockItemIndex: number) => {
              drugRegimenBlockItem.orderItem = drugRegimenBlockItemIndex;
              return drugRegimenBlockItem;
            }
          );
          return drugRegimenBlock;
        }
      );
      return drugRegimen;
    });
  },
  addDiagnosis(state, id: string) {
    const diagnosis = new DrugDiagnosis();
    diagnosis.id = id;
    state.drug.drugsDiagnosis.push(diagnosis);
    console.log(state.drug);
  },
  removeDiagnosis(state, id: string) {
    const index = state.drug.drugsDiagnosis.findIndex((i: IDrugDiagnosis) => i.id === id);
    if (index !== -1) state.drug.drugsDiagnosis.splice(index, 1);
    state.drug.drugsDiagnosisForDelete.push(id);
  },
  clearDiagnosis(state, id: string) {
    const diagnosis = state.drug.drugsDiagnosis.find((d: IDrugDiagnosis) => d.id === id);
    if (diagnosis) {
      diagnosis.mkbDiagnosis = new MkbDiagnosis();
      diagnosis.mkbDiagnosisId = undefined;
      diagnosis.mkbSubDiagnosis = undefined;
      diagnosis.mkbSubDiagnosisId = undefined;
    }
  },
};

export default mutations;

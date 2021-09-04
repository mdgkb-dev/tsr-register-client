import { MutationTree } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import IDrug from '@/interfaces/drugs/IDrug';
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
};

export default mutations;

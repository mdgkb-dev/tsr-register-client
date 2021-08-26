import { MutationTree } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import DrugRegimenBlock from '@/classes/drugs/DrugRegimenBlock';
import DrugRegimenBlockItem from '@/classes/drugs/DrugRegimenBlockItem';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugIndexes from '@/interfaces/drugs/IDrugIndexes';
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
  addDrugRegimen(state, item: IDrugRegimen) {
    state.drug.drugRegimens.push(item);
  },
  editDrugRegimen(state, index: number) {
    state.drug.drugRegimens[index].isEdit = !state.drug.drugRegimens[index].isEdit;
  },
  removeDrugRegimen(state, index: number) {
    state.drug.drugRegimens.splice(index, 1);
  },
  addDrugRegimenBlock(state, index: number) {
    const lastIndex = state.drug.drugRegimens[index].drugRegimenBlocks.length - 1;
    state.drug.drugRegimens[index].drugRegimenBlocks[lastIndex].infinitely = false;
    state.drug.drugRegimens[index].drugRegimenBlocks.push(new DrugRegimenBlock());
  },
  editDrugRegimenBlock(state, indexes: IDrugIndexes) {
    if (indexes.drugRegimenIndex !== undefined && indexes.drugRegimenBlockIndex !== undefined) {
      const isEdit = state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].isEdit;
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].isEdit = !isEdit;
    }
  },
  removeDrugRegimenBlock(state, indexes: IDrugIndexes) {
    if (indexes.drugRegimenIndex !== undefined && indexes.drugRegimenBlockIndex !== undefined) {
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks.splice(indexes.drugRegimenBlockIndex, 1);
    }
  },
  addDrugRegimenBlockItem(state, indexes: IDrugIndexes) {
    if (indexes.drugRegimenIndex !== undefined && indexes.drugRegimenBlockIndex !== undefined) {
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems.push(
        new DrugRegimenBlockItem()
      );
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].isEdit = true;
    }
  },
  removeDrugRegimenBlockItem(state, indexes: IDrugIndexes) {
    if (
      indexes.drugRegimenIndex !== undefined &&
      indexes.drugRegimenBlockIndex !== undefined &&
      indexes.drugRegimenBlockItemIndex !== undefined
    ) {
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems.splice(
        indexes.drugRegimenBlockItemIndex,
        1
      );
    }
  },
  moveDrugRegimenBlockItemUp(state, indexes: IDrugIndexes) {
    if (
      indexes.drugRegimenIndex !== undefined &&
      indexes.drugRegimenBlockIndex !== undefined &&
      indexes.drugRegimenBlockItemIndex !== undefined
    ) {
      const elementToMove =
        state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
          indexes.drugRegimenBlockItemIndex
        ];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
        indexes.drugRegimenBlockItemIndex
      ] =
        state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
          indexes.drugRegimenBlockItemIndex - 1
        ];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
        indexes.drugRegimenBlockItemIndex - 1
      ] = elementToMove;
    }
  },
  moveDrugRegimenBlockItemDown(state, indexes: IDrugIndexes) {
    if (
      indexes.drugRegimenIndex !== undefined &&
      indexes.drugRegimenBlockIndex !== undefined &&
      indexes.drugRegimenBlockItemIndex !== undefined
    ) {
      const elementToMove =
        state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
          indexes.drugRegimenBlockItemIndex
        ];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
        indexes.drugRegimenBlockItemIndex
      ] =
        state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
          indexes.drugRegimenBlockItemIndex + 1
        ];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex].drugRegimenBlockItems[
        indexes.drugRegimenBlockItemIndex + 1
      ] = elementToMove;
    }
  },
  moveDrugRegimenBlockUp(state, indexes: IDrugIndexes) {
    if (indexes.drugRegimenIndex !== undefined && indexes.drugRegimenBlockIndex !== undefined) {
      const elementToMove = state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex] =
        state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex - 1];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex - 1] = elementToMove;
    }
  },
  moveDrugRegimenBlockDown(state, indexes: IDrugIndexes) {
    if (indexes.drugRegimenIndex !== undefined && indexes.drugRegimenBlockIndex !== undefined) {
      const elementToMove = state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex] =
        state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex + 1];
      state.drug.drugRegimens[indexes.drugRegimenIndex].drugRegimenBlocks[indexes.drugRegimenBlockIndex + 1] = elementToMove;
    }
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

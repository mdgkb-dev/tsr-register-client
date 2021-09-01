<template>
  <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="drugRegimenBlock.drugRegimenBlockItems" row-class-name="no-hover">
    <el-table-column align="center" width="50">
      <template #default="scope">
        <TableButtonGroup
          :show-move-up-button="scope.$index !== 0 ? true : false"
          :show-move-down-button="scope.$index !== drugRegimenBlock.drugRegimenBlockItems.length - 1 ? true : false"
          @moveUp="moveDrugRegimenBlockItemUp(drugRegimenIndex, drugRegimenBlockIndex, scope.$index)"
          @moveDown="moveDrugRegimenBlockItemDown(drugRegimenIndex, drugRegimenBlockIndex, scope.$index)"
        />
      </template>
    </el-table-column>
    <el-table-column label="Интервалы">
      <template #default="scope">
        <span v-if="!drugRegimenBlock.isEdit">{{ scope.row.daysCount }}</span>
        <el-input-number v-else v-model="scope.row.daysCount" size="mini" controls-position="right" :min="1"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="Раз в день">
      <template #default="scope">
        <div style="display: flex">
          <el-button
            v-if="!scope.row.timesPerDay"
            class="table-button"
            icon="el-icon-plus"
            @click="addTimesPerDay(drugRegimenIndex, drugRegimenBlockIndex, scope.$index)"
          />
          <span v-else-if="scope.row.timesPerDay && !drugRegimenBlock.isEdit">{{ scope.row.timesPerDay }}</span>
          <el-input-number v-else v-model="scope.row.timesPerDay" size="mini" controls-position="right" :min="0"></el-input-number>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" width="50">
      <template #default="scope">
        <TableButtonGroup
          :show-remove-button="true"
          @remove="removeDrugRegimenBlockItem(drugRegimenIndex, drugRegimenBlockIndex, scope.$index)"
        />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { useStore } from 'vuex';

import DrugIndexes from '@/classes/drugs/DrugIndexes';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';

export default defineComponent({
  name: 'DrugRegimenBlockItemsForm',
  components: { TableButtonGroup },
  props: {
    drugRegimenBlock: {
      type: Object as PropType<IDrugRegimenBlock>,
      required: true,
    },
    drugRegimenBlockIndex: {
      type: Number as PropType<number>,
      required: true,
    },
    drugRegimenIndex: {
      type: Number as PropType<number>,
      required: true,
    },
},

  setup() {
    const store = useStore();

    const drug: Ref<IDrug> = computed(() => store.getters['drugs/drug']);

    const removeDrugRegimenBlockItem = (
      drugRegimenIndex: number,
      drugRegimenBlockIndex: number,
      drugRegimenBlockItemIndex: number
    ): void => {
      store.commit(
        'drugs/removeDrugRegimenBlockItem',
        new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex, drugRegimenBlockItemIndex })
      );
    };
    const moveDrugRegimenBlockItemUp = (
      drugRegimenIndex: number,
      drugRegimenBlockIndex: number,
      drugRegimenBlockItemIndex: number
    ): void => {
      store.commit(
        'drugs/moveDrugRegimenBlockItemUp',
        new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex, drugRegimenBlockItemIndex })
      );
    };
    const moveDrugRegimenBlockItemDown = (
      drugRegimenIndex: number,
      drugRegimenBlockIndex: number,
      drugRegimenBlockItemIndex: number
    ): void => {
      store.commit(
        'drugs/moveDrugRegimenBlockItemDown',
        new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex, drugRegimenBlockItemIndex })
      );
    };
    const addTimesPerDay = (drugRegimenIndex: number, drugRegimenBlockIndex: number, drugRegimenBlockItemIndex: number): void => {
      store.commit('drugs/addTimesPerDay', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex, drugRegimenBlockItemIndex }));
      if (!drug.value.drugRegimens[drugRegimenIndex].drugRegimenBlocks[drugRegimenBlockIndex].isEdit) {
        store.commit('drugs/editDrugRegimenBlock', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
      }
    };

    return {
      removeDrugRegimenBlockItem,
      moveDrugRegimenBlockItemUp,
      moveDrugRegimenBlockItemDown,
      addTimesPerDay,
    };
  },
});
</script>

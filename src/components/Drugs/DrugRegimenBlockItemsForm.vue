<template>
  <el-table :default-sort="{ prop: 'id', order: 'ascending' }" :data="drugRegimenBlock.drugRegimenBlockItems" row-class-name="no-hover">
    <el-table-column align="center" width="50">
      <template #default="scope">
        <TableButtonGroup
          :show-move-up-button="scope.$index !== 0 ? true : false"
          :show-move-down-button="scope.$index !== drugRegimenBlock.drugRegimenBlockItems.length - 1 ? true : false"
          @moveUp="moveDrugRegimenBlockItemUp(scope.$index)"
          @moveDown="moveDrugRegimenBlockItemDown(scope.$index)"
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
          <el-button v-if="!scope.row.timesPerDay" class="table-button" :icon="Plus" @click="addTimesPerDay(scope.row)" />
          <span v-else-if="scope.row.timesPerDay && !drugRegimenBlock.isEdit">{{ scope.row.timesPerDay }}</span>
          <el-input-number v-else v-model="scope.row.timesPerDay" size="mini" controls-position="right" :min="0"></el-input-number>
        </div>
      </template>
    </el-table-column>
    <el-table-column align="center" width="50">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="removeDrugRegimenBlockItem(scope.$index)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Plus } from '@element-plus/icons-vue';
import { defineComponent, PropType } from 'vue';

import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';
import IDrugRegimenBlockItem from '@/interfaces/drugs/IDrugRegimenBlockItem';

export default defineComponent({
  name: 'DrugRegimenBlockItemsForm',
  components: { TableButtonGroup },
  props: {
    drugRegimenBlock: {
      type: Object as PropType<IDrugRegimenBlock>,
      required: true,
    },
  },

  setup(prop) {
    const removeDrugRegimenBlockItem = (drugRegimenBlockItemIndex: number): void => {
      prop.drugRegimenBlock.removeDrugRegimenBlockItem(drugRegimenBlockItemIndex);
    };
    const moveDrugRegimenBlockItemUp = (drugRegimenBlockItemIndex: number): void => {
      prop.drugRegimenBlock.moveDrugRegimenBlockItemUp(drugRegimenBlockItemIndex);
    };
    const moveDrugRegimenBlockItemDown = (drugRegimenBlockItemIndex: number): void => {
      prop.drugRegimenBlock.moveDrugRegimenBlockItemDown(drugRegimenBlockItemIndex);
    };
    const addTimesPerDay = (drugRegimenBlockItem: IDrugRegimenBlockItem): void => {
      drugRegimenBlockItem.timesPerDay = 1;
      prop.drugRegimenBlock.editDrugRegimenBlock(true);
    };

    return {
      removeDrugRegimenBlockItem,
      moveDrugRegimenBlockItemUp,
      moveDrugRegimenBlockItemDown,
      addTimesPerDay,
      Plus,
    };
  },
});
</script>

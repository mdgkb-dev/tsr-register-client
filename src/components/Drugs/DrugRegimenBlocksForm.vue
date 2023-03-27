<template>
  <el-card
    v-for="(drugRegimenBlock, drugRegimenBlockIndex) in drugRegimen.drugRegimenBlocks"
    :key="drugRegimenBlock.id"
    class="regimen-block-card"
  >
    <div class="fixed-move-block-buttons">
      <TableButtonGroup
        :show-move-up-button="drugRegimenBlockIndex !== 0 ? true : false"
        :show-move-down-button="drugRegimenBlockIndex !== drugRegimen.drugRegimenBlocks.length - 1 ? true : false"
        @moveUp="moveDrugRegimenBlockUp(drugRegimenBlockIndex)"
        @moveDown="moveDrugRegimenBlockDown(drugRegimenBlockIndex)"
      />
    </div>

    <div class="card-button-group fixed-buttons">
      <el-tooltip
        v-if="drugRegimenBlockIndex === drugRegimen.drugRegimenBlocks.length - 1"
        effect="light"
        placement="top-end"
        content="Повторять бесконечно"
      >
        <el-switch v-model="drugRegimenBlock.infinitely"> </el-switch>
      </el-tooltip>
      <el-tooltip v-else effect="light" placement="top-end" content="Повторить период">
        <el-button :icon="Document" @click="copyDrugRegimenBlock(drugRegimenBlockIndex)"></el-button>
      </el-tooltip>
      <el-tooltip v-if="!drugRegimenBlock.isEdit" effect="light" placement="top-end" content="Редактировать интервалы">
        <el-button :icon="Edit" @click="editDrugRegimenBlock(drugRegimenBlock)"></el-button>
      </el-tooltip>
      <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
        <el-button :icon="FolderChecked" @click="editDrugRegimenBlock(drugRegimenBlock)"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" placement="top-end" content="Добавить интервал">
        <el-button :icon="Plus" @click="addDrugRegimenBlockItem(drugRegimenBlockIndex)"></el-button>
      </el-tooltip>
      <el-popconfirm
        confirm-button-text="Да"
        cancel-button-text="Отмена"
        :icon="InfoFilled"
        icon-color="red"
        title="Вы уверены, что хотите удалить промежуток?"
        @confirm="removeDrugRegimenBlock(drugRegimenBlockIndex)"
        @cancel="
          () => {
            return null;
          }
        "
      >
        <template #reference>
          <el-button icon="delete"></el-button>
        </template>
      </el-popconfirm>
    </div>

    <DrugRegimenBlockItemsForm :drug-regimen-block="drugRegimenBlock" />
  </el-card>
</template>

<script lang="ts">
import { Delete, Document, Edit, FolderChecked, InfoFilled, Plus } from '@element-plus/icons-vue';
import { computed, defineComponent, PropType, Ref } from 'vue';
import { useStore } from 'vuex';

import DrugRegimenBlockItemsForm from '@/components/Drugs/DrugRegimenBlockItemsForm.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import IDrugRegimenBlock from '@/interfaces/drugs/IDrugRegimenBlock';

export default defineComponent({
  name: 'DrugRegimenBlocksForm',
  components: { DrugRegimenBlockItemsForm, TableButtonGroup },
  props: {
    drugRegimen: {
      type: Object as PropType<IDrugRegimen>,
      required: true,
    },
  },

  setup(prop) {
    const store = useStore();
    const activeCollapseName: Ref<string> = computed(() => store.getters['drugs/activeCollapseName']);

    const addDrugRegimenBlockItem = (drugRegimenBlockIndex: number): void => {
      prop.drugRegimen.drugRegimenBlocks[drugRegimenBlockIndex].addDrugRegimenBlockItem();
      prop.drugRegimen.drugRegimenBlocks[drugRegimenBlockIndex].editDrugRegimenBlock(true);
    };
    const editDrugRegimenBlock = (item: IDrugRegimenBlock): void => {
      item.editDrugRegimenBlock();
    };
    const removeDrugRegimenBlock = (drugRegimenBlockIndex: number): void => {
      prop.drugRegimen.removeDrugRegimenBlock(drugRegimenBlockIndex);
    };
    const copyDrugRegimenBlock = (drugRegimenBlockIndex: number): void => {
      prop.drugRegimen.copyDrugRegimenBlock(drugRegimenBlockIndex);
    };
    const moveDrugRegimenBlockUp = (drugRegimenBlockIndex: number): void => {
      prop.drugRegimen.moveDrugRegimenBlockUp(drugRegimenBlockIndex);
    };
    const moveDrugRegimenBlockDown = (drugRegimenBlockIndex: number): void => {
      prop.drugRegimen.moveDrugRegimenBlockDown(drugRegimenBlockIndex);
    };

    return {
      activeCollapseName,
      editDrugRegimenBlock,
      removeDrugRegimenBlock,
      copyDrugRegimenBlock,
      moveDrugRegimenBlockUp,
      moveDrugRegimenBlockDown,
      addDrugRegimenBlockItem,
      Document,
      Edit,
      FolderChecked,
      Plus,
      InfoFilled,
      Delete,
    };
  },
});
</script>

<style lang="scss" scoped>
.regimen-block-card {
  margin: 10px 0;
  position: relative;
}
.card-button-group {
  display: flex;
  align-items: center;
  z-index: 1;
  .el-switch {
    margin: 5px;
  }
  .el-button {
    margin: 0;
  }
}
.fixed-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
}
.fixed-move-block-buttons {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}
</style>

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
        @moveUp="moveDrugRegimenBlockUp(drugRegimenIndex, drugRegimenBlockIndex)"
        @moveDown="moveDrugRegimenBlockDown(drugRegimenIndex, drugRegimenBlockIndex)"
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
        <el-button icon="el-icon-copy-document" @click="copyDrugRegimenBlock(drugRegimenIndex, drugRegimenBlockIndex)"></el-button>
      </el-tooltip>
      <el-tooltip v-if="!drugRegimenBlock.isEdit" effect="light" placement="top-end" content="Редактировать интервалы">
        <el-button icon="el-icon-edit" @click="editDrugRegimenBlock(drugRegimenIndex, drugRegimenBlockIndex)"></el-button>
      </el-tooltip>
      <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
        <el-button icon="el-icon-folder-checked" @click="editDrugRegimenBlock(drugRegimenIndex, drugRegimenBlockIndex)"></el-button>
      </el-tooltip>
      <el-tooltip effect="light" placement="top-end" content="Добавить интервал">
        <el-button icon="el-icon-plus" @click="addDrugRegimenBlockItem(drugRegimenIndex, drugRegimenBlockIndex)"></el-button>
      </el-tooltip>
      <el-popconfirm
        confirm-button-text="Да"
        cancel-button-text="Отмена"
        icon="el-icon-info"
        icon-color="red"
        title="Вы уверены, что хотите удалить промежуток?"
        @confirm="removeDrugRegimenBlock(drugRegimenIndex, drugRegimenBlockIndex)"
        @cancel="() => {}"
      >
        <template #reference>
          <el-button icon="el-icon-delete"></el-button>
        </template>
      </el-popconfirm>
    </div>

    <DrugRegimenBlockItemsForm
      :drug-regimen-block="drugRegimenBlock"
      :drug-regimen-index="drugRegimenIndex"
      :drug-regimen-block-index="drugRegimenBlockIndex"
    />
  </el-card>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, Ref } from 'vue';
import { useStore } from 'vuex';

import DrugIndexes from '@/classes/drugs/DrugIndexes';
import DrugRegimenBlockItemsForm from '@/components/Drugs/DrugRegimenBlockItemsForm.vue';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';

export default defineComponent({
  name: 'DrugRegimenBlocksForm',
  components: { DrugRegimenBlockItemsForm, TableButtonGroup },
  props: {
    drugRegimen: {
      type: Object as PropType<IDrugRegimen>,
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
    const activeCollapseName: Ref<string> = computed(() => store.getters['drugs/activeCollapseName']);

    const addDrugRegimenBlockItem = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/addDrugRegimenBlockItem', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const editDrugRegimenBlock = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/editDrugRegimenBlock', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const removeDrugRegimenBlock = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/removeDrugRegimenBlock', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const copyDrugRegimenBlock = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/copyDrugRegimenBlock', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const moveDrugRegimenBlockUp = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/moveDrugRegimenBlockUp', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const moveDrugRegimenBlockDown = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/moveDrugRegimenBlockDown', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };

    return {
      drug,
      activeCollapseName,
      editDrugRegimenBlock,
      removeDrugRegimenBlock,
      copyDrugRegimenBlock,
      moveDrugRegimenBlockUp,
      moveDrugRegimenBlockDown,
      addDrugRegimenBlockItem,
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
}
.fixed-move-block-buttons {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}
</style>

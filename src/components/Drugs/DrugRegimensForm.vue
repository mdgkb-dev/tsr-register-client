<template>
  <el-collapse v-model="activeCollapseName" accordion>
    <el-collapse-item v-for="(drugRegimen, drugRegimenIndex) in drug.drugRegimens" :key="drugRegimen.id" :name="String(drugRegimenIndex)">
      <template #title>
        <div class="collapse-header-container">
          <h2 v-if="!drugRegimen.isEdit" class="collapseHeader">{{ drugRegimen.name }}</h2>
          <el-form-item v-else style="width: 100%; margin: 0 10px 0 0" prop="name">
            <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
            <el-input v-model="drugRegimen.name" placeholder="Название схемы приема лекартсва" @click.stop></el-input>
          </el-form-item>
          <div class="card-button-group">
            <el-tooltip v-if="!drugRegimen.isEdit" effect="light" placement="top-end" content="Редактировать схему">
              <el-button :icon="Edit" @click.stop="editDrugRegimen(drugRegimen, drugRegimenIndex)"></el-button>
            </el-tooltip>
            <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
              <el-button :icon="FolderChecked" @click.stop="editDrugRegimen(drugRegimen, drugRegimenIndex)"></el-button>
            </el-tooltip>
            <el-tooltip effect="light" placement="top-end" content="Добавить период">
              <el-button :icon="Plus" @click.stop="addDrugRegimenBlock(drugRegimen, drugRegimenIndex)"></el-button>
            </el-tooltip>
            <el-popconfirm
              confirm-button-text="Да"
              cancel-button-text="Отмена"
              :icon="Info"
              icon-color="red"
              title="Вы уверены, что хотите удалить схему?"
              @confirm="removeDrugRegimen(drugRegimenIndex)"
              @cancel="() => null"
            >
              <template #reference>
                <el-button :icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </div>
        </div>
      </template>

      <DrugRegimenBlocksForm :drug-regimen="drugRegimen" />
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import { Delete, Document, Edit, FolderChecked, InfoFilled, Plus } from '@element-plus/icons-vue';
import { computed, defineComponent, Ref } from 'vue';
import { useStore } from 'vuex';

import Drug from '@/classes/Drug';
import DrugRegimen from '@/classes/DrugRegimen';
import DrugRegimenBlocksForm from '@/components/Drugs/DrugRegimenBlocksForm.vue';

export default defineComponent({
  name: 'DrugRegimensForm',
  components: { DrugRegimenBlocksForm },

  setup() {
    const store = useStore();

    const drug: Ref<Drug> = computed(() => store.getters['drugs/drug']);
    const activeCollapseName: Ref<string> = computed(() => store.getters['drugs/activeCollapseName']);

    const editDrugRegimen = (drugRegimen: DrugRegimen, drugRegimenIndex: number): void => {
      drugRegimen.editDrugRegimen();
      store.commit('drugs/setActiveCollapseName', String(drugRegimenIndex));
    };
    const removeDrugRegimen = (drugRegimenIndex: number): void => {
      drug.value.removeDrugRegimen(drugRegimenIndex);
      if (Number(activeCollapseName.value) !== drugRegimenIndex && Number(activeCollapseName.value) > drugRegimenIndex) {
        store.commit('drugs/setActiveCollapseName', String(Number(activeCollapseName.value) - 1));
      }
      if (Number(activeCollapseName.value) === drugRegimenIndex) activeCollapseName.value = '';
    };
    const addDrugRegimenBlock = (drugRegimen: IDrugRegimen, drugRegimenIndex: number): void => {
      drugRegimen.addDrugRegimenBlock();
      const lastDrugRegimenBlockIndex = drugRegimen.drugRegimenBlocks.length - 1;
      drugRegimen.drugRegimenBlocks[lastDrugRegimenBlockIndex].editDrugRegimenBlock(true);
      store.commit('drugs/setActiveCollapseName', String(drugRegimenIndex));
    };

    return {
      drug,
      activeCollapseName,
      editDrugRegimen,
      removeDrugRegimen,
      addDrugRegimenBlock,
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
@import '@/assets/elements/collapse.scss';
.collapse-header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  .el-button {
    margin-right: 20px;
  }
}
.el-collapse-item {
  position: relative;
}
:deep(.el-collapse-item__header) {
  height: auto;
}
.collapseHeader {
  margin: 0;
}
.card-button-group {
  display: flex;
  align-items: center;
  .el-switch {
    margin: 5px;
  }
  .el-button {
    margin: 0;
  }
}
</style>

<template>
  <div v-if="mount">
    <el-form ref="form" :inline-message="true" :status-icon="true" :model="drug" label-position="left" style="width: 100%">
      <el-row>
        <div class="table-background" style="width: 100%; margin-bottom: 20px">
          <el-form-item label="Наименование лекарства" prop="name">
            <el-input v-model="drug.name"></el-input>
          </el-form-item>
        </div>
        <el-form ref="newDrugRegimenForm" class="new-regimen-container" :model="newDrugRegimen">
          <el-form-item
            style="width: 100%; margin-right: 10px"
            prop="name"
            :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }"
          >
            <el-input v-model="newDrugRegimen.name" placeholder="Название схемы приема лекартсва"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addDrugRegimen">Добавить</el-button>
          </el-form-item>
        </el-form>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item
            v-for="(drugRegimen, drugRegimenIndex) in drug.drugRegimens"
            :key="drugRegimen.id"
            :name="String(drugRegimenIndex + 1)"
          >
            <template #title>
              <div class="collapse-header-container">
                <h2 v-if="!drugRegimen.isEdit" class="collapseHeader">{{ drugRegimen.name }}</h2>
                <el-form-item v-else style="width: 100%; margin: 0 10px 0 0" prop="name">
                  <!-- :rules="{ required: true, message: 'Пожалуйста укажите название схемы приема лекартсва', trigger: 'blur' }" -->
                  <el-input
                    v-model="drugRegimen.name"
                    placeholder="Название схемы приема лекартсва"
                    @click.stop="null"
                    @change.stop="null"
                    @input.stop="null"
                  ></el-input>
                </el-form-item>
                <div class="card-button-group">
                  <el-tooltip v-if="!drugRegimen.isEdit" effect="light" placement="top-end" content="Редактировать схему">
                    <el-button icon="el-icon-edit" @click.stop="editDrugRegimen(drugRegimenIndex)"></el-button>
                  </el-tooltip>
                  <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
                    <el-button icon="el-icon-folder-checked" @click.stop="editDrugRegimen(drugRegimenIndex)"></el-button>
                  </el-tooltip>
                  <el-tooltip effect="light" placement="top-end" content="Добавить схему">
                    <el-button icon="el-icon-plus" @click.stop="addDrugRegimenBlock(drugRegimenIndex)"></el-button>
                  </el-tooltip>
                  <el-popconfirm
                    confirm-button-text="Да"
                    cancel-button-text="Отмена"
                    icon="el-icon-info"
                    icon-color="red"
                    title="Вы уверены, что хотите удалить схему?"
                    @confirm="removeDrugRegimen(drugRegimenIndex)"
                    @cancel="() => {}"
                  >
                    <template #reference>
                      <el-button icon="el-icon-delete"></el-button>
                    </template>
                  </el-popconfirm>
                </div>

                <!-- <el-button-group style="width: 400px">
                  <el-button size="mini" @click.stop="editDrugRegimen(drugRegimenIndex)">Редактировать</el-button>
                  <el-button size="mini" @click.stop="addDrugRegimenBlock(drugRegimenIndex)">Добавить промежуток</el-button>
                  <el-button size="mini" @click.stop="removeDrugRegimen(drugRegimenIndex)">Удалить</el-button>
                </el-button-group> -->
              </div>
            </template>

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

              <el-table
                :default-sort="{ prop: 'id', order: 'ascending' }"
                :data="drugRegimenBlock.drugRegimenBlockItems"
                row-class-name="no-hover"
              >
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
                <el-table-column align="center" width="50">
                  <template #default="scope">
                    <TableButtonGroup
                      :show-remove-button="true"
                      @remove="removeDrugRegimenBlockItem(drugRegimenIndex, drugRegimenBlockIndex, scope.$index)"
                    />
                  </template>
                </el-table-column>
              </el-table>
              <div class="card-button-group fixed-buttons">
                <el-tooltip
                  v-if="drugRegimenBlockIndex === drugRegimen.drugRegimenBlocks.length - 1"
                  effect="light"
                  placement="top-end"
                  content="Повторять бесконечно"
                >
                  <el-switch v-model="drugRegimenBlock.infinitely"> </el-switch>
                </el-tooltip>
                <el-tooltip v-if="!drugRegimenBlock.isEdit" effect="light" placement="top-end" content="Редактировать интервалы">
                  <el-button icon="el-icon-edit" @click="editDrugRegimenBlock(drugRegimenIndex, drugRegimenBlockIndex)"></el-button>
                </el-tooltip>
                <el-tooltip v-else effect="light" placement="top-end" content="Выйти из редактирования">
                  <el-button
                    icon="el-icon-folder-checked"
                    @click="editDrugRegimenBlock(drugRegimenIndex, drugRegimenBlockIndex)"
                  ></el-button>
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
            </el-card>
          </el-collapse-item>
        </el-collapse>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, Ref, ref, watch } from 'vue';
import { NavigationGuardNext, onBeforeRouteLeave, RouteLocationNormalized, useRoute } from 'vue-router';
import { useStore } from 'vuex';

import Drug from '@/classes/drugs/Drug';
import DrugIndexes from '@/classes/drugs/DrugIndexes';
import DrugRegimen from '@/classes/drugs/DrugRegimen';
import MainHeader from '@/classes/shared/MainHeader';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IDrug from '@/interfaces/drugs/IDrug';
import IDrugRegimen from '@/interfaces/drugs/IDrugRegimen';
import useBreadCrumbsLinks from '@/mixins/useBreadCrumbsLinks';
import useConfirmLeavePage from '@/mixins/useConfirmLeavePage';
import useForm from '@/mixins/useForm';
import useValidate from '@/mixins/useValidate';

export default defineComponent({
  name: 'DrugPage',
  components: { TableButtonGroup },

  setup() {
    const store = useStore();
    const route = useRoute();

    const drug: Ref<IDrug> = computed(() => store.getters['drugs/drug']);
    const form = ref();
    const newDrugRegimenForm = ref();
    const isEditMode: Ref<boolean> = ref(!!route.params.drugId);
    const mount: Ref<boolean> = ref(false);
    const activeName: Ref<string> = ref('1');
    const newDrugRegimen: Ref<IDrugRegimen> = ref(new DrugRegimen());

    const { links, pushToLinks } = useBreadCrumbsLinks();
    const { saveButtonClick, beforeWindowUnload, formUpdated, showConfirmModal } = useConfirmLeavePage();
    const { submitHandling } = useForm(isEditMode.value);
    const { validate, validateWithoutMessageBox } = useValidate();

    const addDrugRegimen = (): void => {
      if (!validateWithoutMessageBox(newDrugRegimenForm.value)) return;
      store.commit('drugs/addDrugRegimen', newDrugRegimen.value);
      newDrugRegimen.value = new DrugRegimen();
      activeName.value = String(drug.value.drugRegimens.length);
    };
    const editDrugRegimen = (index: number): void => {
      if (drug.value.drugRegimens[index].name) {
        store.commit('drugs/editDrugRegimen', index);
      }
    };
    const removeDrugRegimen = (index: number): void => {
      store.commit('drugs/removeDrugRegimen', index);
      if (Number(activeName.value) !== index && Number(activeName.value) - 1 > index) {
        activeName.value = String(Number(activeName.value) - 1);
      }
      if (Number(activeName.value) - 1 === index) activeName.value = '';
    };
    const addDrugRegimenBlock = (index: number): void => {
      store.commit('drugs/addDrugRegimenBlock', index);
    };
    const editDrugRegimenBlock = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/editDrugRegimenBlock', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const removeDrugRegimenBlock = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/removeDrugRegimenBlock', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const addDrugRegimenBlockItem = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/addDrugRegimenBlockItem', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
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
    const moveDrugRegimenBlockUp = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/moveDrugRegimenBlockUp', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
    };
    const moveDrugRegimenBlockDown = (drugRegimenIndex: number, drugRegimenBlockIndex: number): void => {
      store.commit('drugs/moveDrugRegimenBlockDown', new DrugIndexes({ drugRegimenIndex, drugRegimenBlockIndex }));
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
      store.commit('drugs/updateOrder');
    };

    onBeforeMount(async () => {
      let title: string;
      if (!route.params.drugId) {
        store.commit('drugs/set', new Drug());
        title = 'Добавить лекарство';
      } else {
        await store.dispatch('drugs/get', route.params.drugId);
        title = drug.value.name;
      }

      pushToLinks(['/drugs'], ['Список лекарств']);
      store.commit('main/setMainHeader', new MainHeader({ title, links, save: submitForm }));
      mount.value = true;

      window.addEventListener('beforeunload', beforeWindowUnload);
      watch(drug, formUpdated, { deep: true });
    });

    onBeforeRouteLeave((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
      showConfirmModal(submitForm, next);
    });

    const submitForm = async (next?: NavigationGuardNext): Promise<void> => {
      saveButtonClick.value = true;
      if (!validate(form.value)) return;

      await submitHandling('drugs', drug.value, next, 'drugs');
    };

    return {
      drug,
      form,
      mount,
      activeName,
      newDrugRegimen,
      newDrugRegimenForm,
      addDrugRegimen,
      editDrugRegimen,
      removeDrugRegimen,
      addDrugRegimenBlock,
      editDrugRegimenBlock,
      removeDrugRegimenBlock,
      addDrugRegimenBlockItem,
      removeDrugRegimenBlockItem,
      moveDrugRegimenBlockItemUp,
      moveDrugRegimenBlockItemDown,
      moveDrugRegimenBlockUp,
      moveDrugRegimenBlockDown,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
.new-regimen-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
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
.regimen-block-card {
  margin: 10px 0;
  position: relative;
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
.fixed-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
}
:deep(.el-collapse-item__header) {
  height: auto;
}
.collapseHeader {
  margin: 0;
}
.fixed-move-block-buttons {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}
</style>

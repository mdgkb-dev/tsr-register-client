<template>
  <GridContainer grid-gap="5px" margin="10px 0">
    <template v-if="!drug.id">
      <Button v-for="drug in drugs" :key="drug.id" button-class="change-button" :text="drug.nameINN" @click="selectDrug(drug)" />
    </template>
    <template v-if="drug.id && !drugForm.id">
      <Button v-for="form in drug.drugForms" :key="form.id" button-class="change-button" :text="form.name" @click="selectDrugForm(form)" />
    </template>
    <template v-if="drugForm.id">
      <Button
        v-for="drugDoze in drugForm.drugDozes"
        :key="drugDoze.id"
        button-class="change-button"
        :text="drugDoze.name"
        @click="selectDrugDoze(drugDoze)"
      />
    </template>
  </GridContainer>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, onBeforeMount, PropType } from 'vue';

import Commission from '@/classes/Commission';
import Drug from '@/classes/Drug';
import DrugDoze from '@/classes/DrugDoze';
import DrugForm from '@/classes/DrugForm';
import DrugRecipe from '@/classes/DrugRecipe';
import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import Button from '@/components/Base/Button.vue';
import DrugsSortsLib from '@/libs/sorts/DrugsSortsLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'CommissionDrugForm',
  components: {
    Button,
    GridContainer,
  },
  props: {
    commission: {
      type: Object as PropType<Commission>,
      required: true,
    },
  },
  emits: ['select'],
  setup(_, { emit }) {
    const drugs: ComputedRef<Drug[]> = computed(() => Provider.store.getters['drugs/items']);
    const drug: ComputedRef<Drug> = computed(() => Provider.store.getters['drugs/item']);
    const drugRecipe: ComputedRef<Drug> = computed(() => Provider.store.getters['drugRecipes/item']);
    const drugForm: ComputedRef<DrugForm> = computed(() => Provider.store.getters['drugForms/item']);

    onBeforeMount(async () => {
      const filterQuery = new FilterQuery();
      filterQuery.pagination.limit = 0;
      filterQuery.setSortModel(DrugsSortsLib.byNameINN());
      await Provider.store.dispatch('drugs/getAll', filterQuery);
    });

    const selectDrug = async (item: Drug): Promise<void> => {
      await Provider.store.dispatch('drugs/get', item.id);
    };

    const selectDrugForm = (item: DrugForm): void => {
      Provider.store.commit('drugForms/set', item);
    };

    const createRecipe = async (item: DrugDoze): Promise<DrugRecipe> => {
      const drugRecipe = DrugRecipe.Create(drug.value, drugForm.value, item);
      await Provider.store.dispatch('drugRecipes/create', drugRecipe);
      return drugRecipe;
    };

    const selectDrugDoze = async (item: DrugDoze): Promise<void> => {
      const drugRecipe = await createRecipe(item);
      console.log(drugRecipe);
      emit('select', drugRecipe);
    };

    return {
      selectDrugDoze,
      drugForm,
      selectDrugForm,
      drug,
      selectDrug,
      drugs,
      ...Provider.getAdminLib(),
    };
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.patient-name {
  color: #006bb4;
  font-size: 14px;
  width: 100%;
  padding: 0px;
}

.medicine {
  color: $site_dark_gray;
  font-size: 17px;
  width: 100%;
  padding: 0px;
}

.hidden {
  display: none;
}

.scroll-block {
  height: 75vh;
  overflow: hidden;
  overflow-y: scroll;
  margin-left: 8px;
}

.registers-tooltip {
  &:hover {
    cursor: pointer;
  }
}
.patient-link {
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}

.tag-link:hover {
  background-color: darken(white, 10%);
  cursor: pointer;
}

.flex-block {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-edit {
  width: 28px;
  height: 28px;
}

.item-flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin: 0 10px 0 0;
}

.item-flex:last-child {
  margin: 10px 0;
}

.line-item-left {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0px;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0px;
}

.icon-plus {
  width: 24px;
  height: 24px;
  cursor: pointer;
}

.icon-del {
  width: 10px;
  height: 10px;
  cursor: pointer;
}

:deep(.edit-icon) {
  width: 28px;
  height: 28px;
  color: #006bb4;
}

.filter-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-block {
  position: relative;
  display: flex;
  z-index: 3;
  justify-content: space-between;
  align-items: end;
  width: calc(100% - 20px);
  padding: 10px 10px 24px 10px;
  background: #f5f5f5;
  height: auto;
  border-bottom: 1px solid #c4c4c4;
}

.tools-block {
  display: flex;
  justify-content: right;
  align-items: center;
  margin-left: 10px;
}

.patient-count {
  margin-top: 10px;
  color: $site_light_pink;
  font-size: 14px;
}

:deep(.el-form-item) {
  margin: 8px 0 0 0;
}

:deep(.edit-button) {
  width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 10px 0 0;
}

:deep(.commission-button) {
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
  margin: 0 10px 0 0;
}

:deep(.change-button) {
  width: 100%;
  height: 42px;
  border-radius: 5px;
  background: #ffffff;
  color: #343e5c;
}

:deep(.medical-commission-button) {
  width: 100%;
  height: 40px;
  border-radius: 5px;
  color: #006bb4;
  background: #dff2f8;
}

@media (max-width: 1915px) {
  .flex-block {
    width: 100%;
    display: block;
    justify-content: space-between;
    align-items: center;
  }
  .line-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0px;
  }
  .item-flex {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .item-flex:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

@media (max-width: 560px) {
  .line-item-left {
    margin: 10px 0;
  }

  .line-item-right {
    margin: 10px 0;
    justify-content: space-between;
  }

  .item-flex:first-child {
    display: block;
    width: 100%;
    margin: 0 0px 10px 0;
  }
}
</style>

<template>
  <StringItem :string="stepper.getStepName()" margin="0 0 30px 0" font-size="16px" color="#006BB4" />
  <Button v-if="stepper.getStepNumber() > 0" button-class="change-button" text="Назад" @click="stepper.decreaseStep()" />
  <RemoteSearch v-if="stepper.getStepNumber() === 0" key-value="drug" placeholder="Начните вводить лекарство" max-width="100%" @select="selectSearch" />
  <div v-if="mounted">
    <GridContainer grid-gap="5px" margin="10px 0">
      <Button
        v-for="item in stepsArrays[stepper.getStepNumber()]"
        :key="item.id"
        button-class="change-button"
        :text="stepper.steps.length - 1 == stepper.getStepNumber() ? drugRecipe.getFullName() + item.getName() : item.getName()"
        @click="stepper.actStepFunc(item)"
      />
    </GridContainer>
  </div>
</template>

<script lang="ts">
import { v4 as uuidv4 } from 'uuid';
import { computed, ComputedRef, defineComponent, onBeforeMount, Ref, ref } from 'vue';

import Drug from '@/classes/Drug';
import DrugDoze from '@/classes/DrugDoze';
import DrugForm from '@/classes/DrugForm';
import DrugRecipe from '@/classes/DrugRecipe';
import Step from '@/classes/stepper/Step';
import Stepper from '@/classes/stepper/Stepper';
import Button from '@/services/components/Button.vue';
import RemoteSearch from '@/services/components/RemoteSearch.vue';
import ISearchObject from '@/interfaces/ISearchObject';
import DrugDozesFiltersLib from '@/libs/filters/DrugDozesFiltersLib';
import DrugFormsFiltersLib from '@/libs/filters/DrugFormsFiltersLib';
import DrugsSortsLib from '@/libs/sorts/DrugsSortsLib';
import FilterQuery from '@/services/classes/filters/FilterQuery';
import GridContainer from '@/services/components/GridContainer.vue';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'DrugSelectForm',
  components: {
    Button,
    GridContainer,
    StringItem,
    RemoteSearch,
  },
  emits: ['select'],
  setup(_, { emit }) {
    const drugs: ComputedRef<Drug[]> = computed(() => Provider.store.getters['drugs/items']);
    const drug: ComputedRef<Drug> = computed(() => Provider.store.getters['drugs/item']);
    const drugForms: ComputedRef<DrugForm[]> = computed(() => Provider.store.getters['drugForms/items']);
    const drugDozes: ComputedRef<DrugDoze[]> = computed(() => Provider.store.getters['drugDozes/items']);
    const drugRecipe: ComputedRef<DrugRecipe> = computed(() => Provider.store.getters['drugRecipes/item']);

    const mounted = ref(false);
    const stepsArrays = ref();
    const stepper: Ref<Stepper> = ref(new Stepper([]));

    onBeforeMount(async () => {
      const filterQuery = new FilterQuery();
      filterQuery.pagination.limit = 0;
      filterQuery.setSortModel(DrugsSortsLib.byNameINN());
      // await Provider.store.dispatch('drugs/getAll', { filterQuery });

      stepsArrays.value = {
        0: drugs,
        1: drugForms,
        2: drugDozes,
      };

      stepper.value = new Stepper([
        new Step(selectDrug, 'Выберите препарат:'),
        new Step(selectDrugForm, 'Выберите форму выпуска:'),
        new Step(selectDrugDoze, 'Выберите дозировку:'),
      ]);

      mounted.value = true;
    });

    const selectDrug = async (item: Drug): Promise<void> => {
      const filterQuery = new FilterQuery();
      filterQuery.setFilterModel(DrugFormsFiltersLib.byDrugId(item.id));
      filterQuery.pagination.limit = 0;
      await Provider.store.dispatch('drugForms/getAll', { filterQuery });
      drugRecipe.value.setDrug(item);
    };

    const selectDrugForm = async (item: DrugForm): Promise<void> => {
      const filterQuery = new FilterQuery();
      filterQuery.setFilterModel(DrugDozesFiltersLib.byDrugFormId(item.id));
      filterQuery.pagination.limit = 0;
      await Provider.store.dispatch('drugDozes/getAll', { filterQuery });
      drugRecipe.value.setDrugForm(item);
    };

    const selectDrugDoze = async (item: DrugDoze): Promise<void> => {
      drugRecipe.value.setDrugDoze(item);
      drugRecipe.value.id = uuidv4();
      await Provider.store.dispatch('drugRecipes/create', drugRecipe.value);
      emit('select', drugRecipe.value);
    };

    const selectSearch = async (result: ISearchObject) => {
      await Provider.store.dispatch('drugs/get', result.value);
      stepper.value.actStepFunc(drug.value as never);
    };

    return {
      mounted,
      stepper,
      stepsArrays,
      drugRecipe,
      selectDrugDoze,
      selectDrugForm,
      selectDrug,
      drugs,
      selectSearch,
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
  padding: 0;
}

.medicine {
  color: $site_dark_gray;
  font-size: 17px;
  width: 100%;
  padding: 0;
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
  padding: 0;
}

.line-item-right {
  display: flex;
  justify-content: right;
  align-items: center;
  width: auto;
  padding: 0;
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
  align-items: flex-end;
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
    padding: 0;
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

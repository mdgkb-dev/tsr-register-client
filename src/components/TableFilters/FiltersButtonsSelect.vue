<template>
  <InfoItem
    margin="0"
    :with-open-window="false"
    :with-icon="false"
    height="76px"
    background="#F5F5F5"
    border-color="#C4C4C4"
    padding="7px"
    :with-hover="false"
  >
    <template #title>
      <StringItem :string="defaultLabel" font-size="10px" padding="0" />
    </template>
    <template #close-inside-content>
      <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px">
        <template #grid-items>
          <Button
            v-for="(model, index) in models"
            :key="index"
            :text="model.label"
            :with-icon="false"
            width="auto"
            height="34px"
            border-radius="5px"
            color="#006BB4"
            :background="model.id === selectedFilterModel?.id ? '#DFF2F8' : '#ffffff'"
            background-hover="#DFF2F8"
            font-size="12px"
            @click="setFilter(model.id === selectedFilterModel?.id ? undefined : model)"
          >
          </Button>
        </template>
      </GridContainer>
    </template>
  </InfoItem>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref, WritableComputedRef } from 'vue';

import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import InfoItem from '@/components/admin/Patients/InfoItem.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'FiltersButtonsSelect',
  components: { StringItem, Button, InfoItem, GridContainer },
  props: {
    models: {
      type: Array as PropType<FilterModel[]>,
      default: () => [],
    },
    defaultLabel: {
      type: String as PropType<string>,
      default: 'Все',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const emptyFilterModel: WritableComputedRef<FilterModel> = computed(() => new FilterModel());
    const selectedFilterModel: Ref<FilterModel | undefined> = ref(undefined);
    const selectedId: Ref<string | undefined> = ref(undefined);
    const setDefaultFilterModel = (): void => {
      selectedFilterModel.value = emptyFilterModel.value;
    };
    onBeforeMount((): void => {
      const findedModel = props.models?.find((m: FilterModel) => Provider.filterQuery.value.findFilterModel(m));
      if (findedModel) {
        selectedFilterModel.value = findedModel;
        return;
      }
      setDefaultFilterModel();
    });

    const setFilter = async (model: FilterModel | undefined) => {
      if (model && (model.table || model.model)) {
        selectedFilterModel.value = model;
        Provider.replaceFilterModel(selectedFilterModel.value, selectedId.value);
        selectedId.value = selectedFilterModel.value.id;
      } else {
        Provider.spliceFilterModel(selectedId.value);
        selectedFilterModel.value = undefined;
      }
      Provider.dropPagination();
      await Provider.router.replace({ query: { q: Provider.filterQuery.value.toUrlQuery() } });
      emit('load');
    };

    return {
      selectedFilterModel,
      setDefaultFilterModel,
      setFilter,
      emptyFilterModel,
    };
  },
});
</script>

<style lang="scss" scoped>
.anticon {
  margin: 4px 4px 2px 4px;
  font-size: 13px;
  &:hover {
    color: #5cb6ff;
  }
}
.set {
  color: #5cb6ff;
}

:deep(.el-input__inner) {
  border-radius: 20px;
  padding-left: 25px;
  height: 34px;
  width: 100%;
  display: flex;
  font-family: Comfortaa, Arial, Helvetica, sans-serif;
  font-size: 15px;
}

:deep(.el-input__inner::placeholder) {
  color: #4a4a4a;
}

:deep(.el-select .el-input .el-select__caret) {
  color: #4a4a4a;
  font-size: 16px;
  font-weight: bold;
  margin-right: 5px;
}

.el-select {
  width: 100%;
}

:deep(.el-form-item) {
  margin-bottom: 0px;
}
</style>

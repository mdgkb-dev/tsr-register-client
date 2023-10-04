<template>
  <InfoItem
    margin="0"
    :with-open-window="false"
    :with-icon="false"
    height="98px"
    background="#F5F5F5"
    border-color="#C4C4C4"
    padding="7px"
    :with-hover="false"
  >
    <template #title>
      <StringItem :string="defaultLabel" font-size="10px" padding="0" color="#c4c4c4" />
    </template>
    <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(100%, 1fr))" margin="0px">
      <Button
        v-for="(model, index) in models"
        :key="index"
        button-class="filter-button"
        :text="model.label"
        :with-icon="false"
        :is-toggle="model.id === selectedFilterModel?.id"
        :toggle-mode="true"
        :inverse="inverse"
        background-hover="DFF2F8"
        :height="78 / models.length - (models.length - 1) * 2 + 'px'"
        @click="setFilter(model.id === selectedFilterModel?.id ? undefined : model)"
      >
      </Button>
    </GridContainer>
  </InfoItem>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, PropType, Ref, ref, WritableComputedRef } from 'vue';

import Button from '@/components/Base/Button.vue';
import FilterModel from '@/services/classes/filters/FilterModel';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import StringItem from '@/services/components/StringItem.vue';
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
    inverse: { type: Boolean as PropType<boolean>, required: false, default: false },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const emptyFilterModel: WritableComputedRef<FilterModel> = computed(() => new FilterModel());
    const selectedFilterModel: Ref<FilterModel | undefined> = ref(undefined);
    const selectedId: Ref<string | undefined> = ref(undefined);
    const selected = computed(() => {
      return props.inverse && !selectedFilterModel.value?.id;
    });
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
      selected,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-button {
  width: auto;
  height: 23px;
  border-radius: 5px;
  color: #006bb4;
  background: #ffffff;
  font-size: 12px;
}

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
  margin-bottom: 0;
}
</style>

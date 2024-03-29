<template>
  <InfoItem
    margin="0"
    :with-open-window="false"
    :with-icon="false"
    :height="height"
    background="#F5F5F5"
    border-color="#C4C4C4"
    padding="7px"
    :with-hover="false"
    :title="defaultLabel"
  >
    <GridContainer max-width="100%" grid-gap="7px" :grid-template-columns="gridTemplateColumns" margin="0px">
      <Button
        v-for="(option, index) in options"
        :key="index"
        :text="option.label"
        :with-icon="false"
        width="auto"
        height="34px"
        border-radius="5px"
        color="#006BB4"
        :is-toggle="selectedOptions.some((s) => s === option.value)"
        background="#ffffff"
        background-hover="#DFF2F8"
        :toggle-mode="true"
        font-size="12px"
        @click="toggleOption(option)"
      >
      </Button>
    </GridContainer>
  </InfoItem>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import IOption from '@/interfaces/shared/IOption';
import FilterModel from '@/services/classes/filters/FilterModel';
import Button from '@/services/components/Button.vue';
import GridContainer from '@/services/components/GridContainer.vue';
import InfoItem from '@/services/components/InfoItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'FiltersButtonsMultiply',
  components: { Button, InfoItem, GridContainer },
  props: {
    options: {
      type: Array as PropType<IOption[]>,
      default: () => [],
    },
    filterModel: {
      type: Object as PropType<FilterModel>,
      default: () => new FilterModel(),
      required: true,
    },
    defaultLabel: {
      type: String as PropType<string>,
      default: 'Все',
    },

    gridTemplateColumns: {
      type: String as PropType<string>,
      default: 'repeat(auto-fit, minmax(calc(50% - 7px), 1fr))',
    },
    height: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const selectedOptions: Ref<string[]> = ref([]);
    const toggleOption = (values: IOption) => {
      const existingIndex = selectedOptions.value.findIndex((o: string) => o === values.value);
      if (existingIndex > -1) {
        selectedOptions.value.splice(existingIndex, 1);
      } else {
        selectedOptions.value.push(values.value);
      }
      props.filterModel.replaceSet(...selectedOptions.value);
      if (!selectedOptions.value.length) {
        reloadModel();
      } else {
        Provider.setFilterModel(props.filterModel);
      }
      emit('load');
    };

    const reloadModel = () => {
      Provider.spliceFilterModel(props.filterModel.id);
    };

    return {
      selectedOptions,
      toggleOption,
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
  margin-bottom: 0;
}
</style>

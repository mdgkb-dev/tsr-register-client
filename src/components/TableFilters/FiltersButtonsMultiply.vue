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
      <GridContainer max-width="100%" grid-gap="7px" grid-template-columns="repeat(auto-fit, minmax(calc(50% - 7px), 1fr))" margin="0px">
        <template #grid-items>
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
        </template>
      </GridContainer>
    </template>
  </InfoItem>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import GridContainer from '@/components/admin/Patients/GridContainer.vue';
import StringItem from '@/components/admin/Patients/StringItem.vue';
import Button from '@/components/Base/Button.vue';
import InfoItem from '@/components/Lib/InfoItem.vue';
import IOption from '@/interfaces/schema/IOption';
import FilterModel from '@/services/classes/filters/FilterModel';
import Provider from '@/services/Provider/Provider';
export default defineComponent({
  name: 'FiltersButtonsMultiply',
  components: { StringItem, Button, InfoItem, GridContainer },
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
  margin-bottom: 0px;
}
</style>

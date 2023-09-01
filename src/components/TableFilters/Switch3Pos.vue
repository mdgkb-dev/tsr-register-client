<template>
  <div class="switch-container">
    <div class="line">
      <StringItem
        :string="firstModel.label"
        font-size="12px"
        padding="0"
        :style="{ color: knob1 ? '#006bb4' : '#B0A4C0' }"
        @click="selectFirstModel"
      />
      <StringItem string="Все" font-size="12px" padding="0" :style="{ color: knob2 ? '#006bb4' : '#B0A4C0' }" @click="dropFilters" />
      <StringItem
        :string="secondModel.label"
        font-size="12px"
        padding="0"
        :style="{ color: knob3 ? '#006bb4' : '#B0A4C0' }"
        @click="selectSecondModel"
      />
    </div>
    <div class="line">
      <div
        class="switch-knob1"
        :style="{
          background: knob1 ? '' : 'inherit',
          border: knob1 ? '' : 'none',
        }"
        @click="selectFirstModel"
      />
      <div
        class="switch-knob2"
        :style="{
          background: knob2 ? '' : 'inherit',
          border: knob2 ? '' : 'none',
        }"
        @click="dropFilters()"
      />

      <div
        class="switch-knob3"
        :style="{
          background: knob3 ? '' : 'inherit',
          border: knob3 ? '' : 'none',
        }"
        @click="selectSecondModel()"
      />

      <div class="switch-axis"></div>
      <div class="switch-axis-dash1"></div>
      <div class="switch-axis-dash2"></div>
      <div class="switch-axis-dash3"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, Ref, ref } from 'vue';

import FilterModel from '@/services/classes/filters/FilterModel';
import StringItem from '@/services/components/StringItem.vue';
import Provider from '@/services/Provider/Provider';

export default defineComponent({
  name: 'Switch3Pos',
  components: {
    StringItem,
  },
  props: {
    firstModel: {
      type: Object as PropType<FilterModel>,
      required: true,
    },
    secondModel: {
      type: Object as PropType<FilterModel>,
      required: true,
    },
    defaultLabel: {
      type: String as PropType<string>,
      default: 'Все',
    },
  },
  emits: ['load'],
  setup(props, { emit }) {
    const knob1 = ref(false);
    const knob2 = ref(true);
    const knob3 = ref(false);
    const selectedId: Ref<string | undefined> = ref(undefined);
    const selectedFilterModel: Ref<FilterModel | undefined> = ref(undefined);

    const selectFirstModel = () => {
      if (selectedId.value === props.firstModel.id) {
        return;
      }
      Provider.spliceFilterModel(selectedId.value);
      selectedId.value = undefined;
      selectedFilterModel.value = undefined;

      knob1.value = true;
      knob2.value = false;
      knob3.value = false;

      selectedFilterModel.value = props.firstModel;
      Provider.replaceFilterModel(selectedFilterModel.value, selectedId.value);
      selectedId.value = selectedFilterModel.value.id;
      emit('load');
    };
    const dropFilters = () => {
      if (!selectedId.value) {
        return;
      }
      knob1.value = false;
      knob2.value = true;
      knob3.value = false;
      Provider.spliceFilterModel(selectedId.value);

      selectedId.value = undefined;
      selectedFilterModel.value = undefined;
      emit('load');
    };

    const selectSecondModel = () => {
      if (selectedId.value === props.secondModel.id) {
        return;
      }
      Provider.spliceFilterModel(selectedId.value);
      selectedId.value = undefined;
      selectedFilterModel.value = undefined;

      knob1.value = false;
      knob2.value = false;
      knob3.value = true;

      selectedFilterModel.value = props.secondModel;
      Provider.replaceFilterModel(selectedFilterModel.value, selectedId.value);
      selectedId.value = selectedFilterModel.value.id;
      emit('load');
    };

    return {
      selectFirstModel,
      dropFilters,
      selectSecondModel,
      knob1,
      knob2,
      knob3,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/styles/elements/base-style.scss';

.switch-container {
  width: calc(100% - 2px);
  height: 74px;
  border: $light-pink-border;
  border-radius: $normal-border-radius;
  background: $base-background;
}

.line {
  position: relative;
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.line:last-child {
  margin-top: 5px;
}

.switch-axis {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  width: calc(100% - 30px);
  height: 1px;
  background: #b0a4c0;
}

.switch-axis-dash1 {
  position: absolute;
  top: 6px;
  left: 14px;
  width: 1px;
  height: 9px;
  background: #b0a4c0;
}

.switch-axis-dash2 {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 0.5px;
  height: 9px;
  background: #b0a4c0;
}

.switch-axis-dash3 {
  position: absolute;
  top: 6px;
  right: 14px;
  width: 1px;
  height: 9px;
  background: #b0a4c0;
}

.switch-knob1 {
  position: absolute;
  left: 6px;
  width: 16px;
  height: 32px;
  background: #dff2f8;
  border-radius: 2px;
  border: 1px solid #006bb4;
  z-index: 1;
  transition: 0.1s;
}

.switch-knob2 {
  position: absolute;
  left: calc(50% - 9px);
  width: 16px;
  height: 32px;
  background: #dff2f8;
  border-radius: 2px;
  border: 1px solid #006bb4;
  z-index: 1;
  transition: 0.1s;
}

.switch-knob3 {
  position: absolute;
  right: 6px;
  width: 16px;
  height: 32px;
  background: #dff2f8;
  border-radius: 2px;
  border: 1px solid #006bb4;
  z-index: 1;
  transition: 0.1s;
}
</style>

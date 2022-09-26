<template>
  <el-form-item v-if="property.valueType.isDate()">
    <el-date-picker
      ref="datePick"
      v-model="dataModel"
      type="date"
      format="DD.MM.YYYY"
      placeholder="Выберите дату"
      @keydown="dateFormat"
      @visible-change="ignoreVisibility"
    />
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, toRefs, WritableComputedRef } from 'vue';

import IRegisterGroupToPatient from '@/interfaces/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/IRegisterProperty';
import dateFormat from '@/services/DateMask';

export default defineComponent({
  name: 'DataComponentComputed',
  props: {
    registerGroupToPatient: {
      type: Object as PropType<IRegisterGroupToPatient>,
      required: true,
    },
    property: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const { registerGroupToPatient, property } = toRefs(props);
    const datePick = ref();
    const dataModel: WritableComputedRef<boolean | string | number | Date | null> = computed({
      get(): boolean | string | number | Date | null {
        return registerGroupToPatient.value.getRegisterPropertyValue(property.value, false);
      },
      set(value: boolean | string | number | Date | null): void {
        let newValue: number | string | Date;

        if (typeof value === 'number' || typeof value === 'string' || value instanceof Date) {
          newValue = value;
        } else {
          return;
        }

        if (property.value.id) {
          registerGroupToPatient.value.setRegisterPropertyValue(newValue, property.value);
        }
      },
    });

    const ignoreVisibility = (v: boolean) => (v = false);

    return {
      ignoreVisibility,
      datePick,
      dateFormat,
      dataModel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>

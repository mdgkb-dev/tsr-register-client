<template>
  <el-form-item v-if="property.valueType.isDate()">
    <el-date-picker v-model="dataModel" type="date" format="DD.MM.YYYY" placeholder="Выберите дату" />
  </el-form-item>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, WritableComputedRef } from 'vue';

import IRegisterGroupToPatient from '@/interfaces/registers/IRegisterGroupToPatient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

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

    const dataModel: WritableComputedRef<boolean | string | number | Date | null> = computed({
      get(): boolean | string | number | Date | null {
        // return patient.value.getRegisterPropertyValue(property.value, false);
        return false;
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

    return {
      dataModel,
    };
  },
});
</script>

<style lang="scss" scoped>
@import '@/assets/elements/collapse.scss';
</style>

<template>
  <el-date-picker v-model="dataModel" type="date" format="DD.MM.YYYY" placeholder="Выберите дату" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, WritableComputedRef } from 'vue';

import IPatient from '@/interfaces/patients/IPatient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default defineComponent({
  name: 'DataComponentComputed',
  props: {
    patient: {
      type: Object as PropType<IPatient>,
      required: true,
    },
    property: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const { patient, property } = toRefs(props);

    const dataModel: WritableComputedRef<boolean | string | number | Date | null> = computed({
      get(): boolean | string | number | Date | null {
        return patient.value.getRegisterPropertyValue(property.value);
      },
      set(value: boolean | string | number | Date | null): void {
        let newValue: number | string | Date;

        if (typeof value === 'number' || typeof value === 'string' || value instanceof Date) {
          newValue = value;
        } else {
          return;
        }

        if (property.value.id) {
          patient.value.setRegisterPropertyValue(newValue, property.value);
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

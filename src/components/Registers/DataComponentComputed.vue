<template>
  <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="dataModel" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Patient from '@/classes/patients/Patient';

@Options({
  props: ['patient', 'propertyId'],
})
export default class DataComponentComputed extends Vue {
  patient!: Patient;
  propertyId!: string;

  get dataModel() {
    return this.patient.getRegisterPropertyValue(this.propertyId, 'date');
  }

  set dataModel(value: any) {
    this.patient.setRegisterPropertyValue(value, this.propertyId, 'date');
  }
}
</script>

<style lang="scss" scoped>
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>

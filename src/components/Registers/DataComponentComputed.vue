<template>
  <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="dataModel" />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import Patient from '@/classes/patients/Patient';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

@Options({
  name: 'DataComponentComputed',
  props: ['patient', 'property'],
})
export default class DataComponentComputed extends Vue {
  patient!: Patient;
  property!: IRegisterProperty;

  get dataModel() {
    return this.patient.getRegisterPropertyValue(this.property);
  }

  set dataModel(value: any) {
    if (this.property.id) {
      this.patient.setRegisterPropertyValue(value, this.property);
    }
  }
}
</script>

<style lang="scss" scoped>
.patient-page-container:deep {
  @import '@/assets/elements/collapse.scss';
}
</style>

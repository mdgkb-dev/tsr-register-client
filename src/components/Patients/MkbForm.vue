<template>
  <el-form-item>
    <el-form-item v-for="(item, index) in mkbToPatient" :key="index" v-model="mkbToPatient">
      <el-select placeholder="Выберите диагноз" filterable v-model="mkbToPatient[index].mkbId">
        <el-option
          v-for="item in inMkbOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-checkbox v-model="mkbToPatient[index].primary">Первичный</el-checkbox>
      <el-button @click.prevent="removeDiagnosis(item)">Удалить диагноз</el-button>
    </el-form-item>

    <el-form-item>
      <el-button @click="addDiagnosis">Добавить диагноз</el-button>
    </el-form-item>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IOption from '@/interfaces/patients/IOption';
import IMkbToPatient from '@/interfaces/mkb/IMkbToPatient';

@Options({
  props: ['in-mkb-options', 'in-mkb-to-patient'],
})
export default class MkbForm extends Vue {
  // Types.
  inMkbToPatient!: IMkbToPatient[];

  inMkbOptions!: IOption[];

  // Local state.
  mkbToPatient = this.inMkbToPatient;

  addDiagnosis(): void {
    this.mkbToPatient.push({
      primary: false,
      mkbId: '',
      patientId: '',
    });
  }

  removeDiagnosis(item: any): void {
    const index = this.mkbToPatient.indexOf(item);
    if (index !== -1) {
      this.mkbToPatient.splice(index, 1);
    }
  }
}
</script>

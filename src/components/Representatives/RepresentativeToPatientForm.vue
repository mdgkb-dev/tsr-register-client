<template>
  <h3>Подопечные представителя</h3>
  <el-row>
    <el-form-item>
      <el-row>
        <el-form-item v-for="(item, index) in representativeToPatient" :key="index" v-model="representativeToPatient">
          <el-space direction="horizontal" alignment="start" :size="1">
            <span>Пациент</span>
            <el-col :span="12">
              <el-select v-model="representativeToPatient[index].patientId">
                <el-option v-for="item in inPatients" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>

            <span>Роль представителя</span>
            <el-col :span="11">
              <el-select v-model="representativeToPatient[index].representativeTypeId">
                <el-option v-for="item in inRepresentativeTypes" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-col>
            <el-col :span="1">
              <el-button @click.prevent="remove(item)">Удалить пациента</el-button>
            </el-col>
          </el-space>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button @click="add">Добавить пациента</el-button>
        </el-form-item>
      </el-row>
    </el-form-item>
  </el-row>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IOption from '@/interfaces/shared/IOption';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';

@Options({
  props: ['in-representative-to-patient', 'in-representative-types', 'in-patients'],
})
export default class RepresentativeToPatientForm extends Vue {
  // Types.
  inRepresentativeToPatient!: IRepresetnationType[];
  inRepresentativeTypes!: IOption[];
  inPatients!: IOption[];

  // Local state.
  representativeToPatient = this.inRepresentativeToPatient;

  add(): void {
    this.representativeToPatient.push(new RepresentativeToPatient());
  }

  remove(item: any): void {
    const index = this.representativeToPatient.indexOf(item);
    if (index !== -1) {
      this.representativeToPatient.splice(index, 1);
    }
  }
}
</script>

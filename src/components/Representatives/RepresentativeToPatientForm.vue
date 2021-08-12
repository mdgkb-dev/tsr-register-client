<template>
  <el-button style="margin-bottom: 20px" @click="add">Добавить подопечного</el-button>
  <el-table :data="representativeToPatient" style="width: 950px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Пациент" width="250" sortable align="center">
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].patientId">
          <el-option v-for="item in inPatients" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="center">
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].representativeTypeId">
          <el-option v-for="item in inRepresentativeTypes" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column width="40" fixed="right" align="center">
      <template #default="scope">
        <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRepresetnationType from '@/interfaces/representatives/IRepresentativeToPatient';
import IOption from '@/interfaces/shared/IOption';

@Options({
  name: 'RepresentativeToPatientForm',
  props: ['inRepresentativeToPatient', 'inRepresentativeTypes', 'inPatients'],
  components: {
    TableButtonGroup,
  },
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

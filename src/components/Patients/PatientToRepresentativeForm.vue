<template>
  <el-table :data="representativeToPatient" style="width: 100%">
    <el-table-column type="index" width="50" />
    <el-table-column label="Представитель" width="250" sortable>
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].representativeId">
          <el-option v-for="item in inRepresentatives" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="Роль представителя">
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].representativeTypeId">
          <el-option v-for="item in inRepresentativeTypes" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column>
      <template #default="scope">
        <el-button @click.prevent="remove(scope.row)" round>Удалить представителя</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import RepresentativeToPatient from '@/classes/representatives/RepresentativeToPatient';
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IOption from '@/interfaces/shared/IOption';

@Options({
  props: ['in-representative-to-patient', 'in-representative-types', 'in-representatives'],
})
export default class PatientToRepresentativeForm extends Vue {
  // Types.
  inRepresentativeToPatient!: IRepresentativeToPatient[];
  inRepresentativeTypes!: IOption[];
  inRepresentatives!: IOption[];

  // Local state.
  representativeToPatient = this.inRepresentativeToPatient;

  add(): void {
    this.representativeToPatient.push(new RepresentativeToPatient());
  }

  remove(item: IRepresentativeToPatient): void {
    const index = this.representativeToPatient.indexOf(item);
    if (index !== -1) {
      this.representativeToPatient.splice(index, 1);
    }
  }
}
</script>

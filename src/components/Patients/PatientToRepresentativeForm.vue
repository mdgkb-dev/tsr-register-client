<template>
  <!-- <el-button @click="add" style="margin-bottom: 20px">Добавить представителя</el-button> -->
  <el-table :data="representativeToPatient" style="width: 950px" class="table-shadow" header-row-class-name="header-style">
    <el-table-column type="index" width="50" align="center" />

    <el-table-column label="Представитель" width="250" sortable align="center">
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].representativeId">
          <el-option v-for="item in inRepresentatives" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </template>
    </el-table-column>

    <el-table-column label="Роль представителя" align="center">
      <template #default="scope">
        <el-select v-model="representativeToPatient[scope.$index].representativeTypeId">
          <el-option v-for="item in inRepresentativeTypes" :key="item.id" :label="item.name" :value="item.id"> </el-option>
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
import IRepresentativeToPatient from '@/interfaces/representatives/IRepresentativeToPatient';
import IOption from '@/interfaces/shared/IOption';

@Options({
  name: 'PatientToRepresentativeForm',
  components: {
    TableButtonGroup,
  },
  props: ['inRepresentativeToPatient', 'inRepresentativeTypes', 'inRepresentatives'],
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

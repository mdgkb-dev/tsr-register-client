<template>
  <div class="table-under-collapse">
    <el-button @click="add" style="margin-bottom: 20px">Добавить измерение</el-button>

    <el-table :data="heightWeight" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column prop="human.dateBirth" label="Дата измерения" width="250" sortable align="center">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.date'"
            :rules="[{ required: true, message: 'Необходимо выбрать дату антропометрии', trigger: 'blur' }]"
          >
            <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="scope.row.date"></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="height" label="Рост" width="200" align="center">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.height'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение роста', trigger: 'blur' }]"
          >
            <el-input-number size="medium" v-model="scope.row.height" min="0" style="width: 120px"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column prop="weight" label="Вес" width="200" align="center">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.weight'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение веса', trigger: 'blur' }]"
          >
            <el-input-number size="medium" v-model="scope.row.weight" min="0" style="width: 120px"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>

      <el-table-column label="ИМТ">
        <template #default="scope">
          {{ scope.row.getBmiGroup(inBirthDate, isMale) }}
        </template>
      </el-table-column>

      <el-table-column width="40" fixed="right" align="center">
        <template #default="scope">
          <TableButtonGroup @remove="remove(scope.$index)" :showRemoveButton="true" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import HeightWeight from '@/classes/anthropometry/HeightWeight';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';

@Options({
  name: 'AnthropometryForm',
  props: ['inBirthDate', 'inHeightWeight', 'isMale'],
  components: {
    TableButtonGroup,
  },
})
export default class AnthropometryForm extends Vue {
  // Types.
  inBirthDate!: string;
  isMale!: boolean;
  inHeightWeight!: IHeightWeight[];
  // Local state.
  heightWeight = this.inHeightWeight;

  add(): void {
    this.heightWeight.push(new HeightWeight());
  }
  remove(index: number): void {
    this.heightWeight.splice(index, 1);
  }
}
</script>

<template>
  <div class="table-under-collapse">
    <el-button @click="add">Добавить измерение</el-button>
    <el-table :data="heightWeight" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="human.dateBirth" label="Дата измерения" width="250" sortable>
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.date'"
            :rules="[{ required: true, message: 'Необходимо заполнить дату антропометрии', trigger: 'blur' }]"
          >
            <el-date-picker type="date" format="DD.MM.YYYY" placeholder="Выберите дату" v-model="scope.row.date"></el-date-picker>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="height" label="Рост" width="250">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.height'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение роста', trigger: 'blur' }]"
          >
            <el-input-number size="medium" controls-position="right" v-model="scope.row.height"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="Вес" width="250">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'heightWeight.' + scope.$index + '.weight'"
            :rules="[{ required: true, message: 'Необходимо заполнить значение веса', trigger: 'blur' }]"
          >
            <el-input-number size="medium" controls-position="right" v-model="scope.row.weight"></el-input-number>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column width="500" label="ИМТ">
        <template #default="scope">
          {{ scope.row.getBmiGroup(inBirthDate, true) }}
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button @click="remove(scope.$index)" type="text" size="small">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IHeightWeight from '@/interfaces/anthropometry/IHeightWeight';
import HeightWeight from '@/classes/anthropometry/HeightWeight';

@Options({
  props: ['in-birth-date', 'in-height-weight', 'is-male'],
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

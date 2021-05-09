<template>
  <el-form-item v-for="param in inAnthropometry" :key="param">
    <el-form-item :label="param.name">
      <el-button @click="add(param.id)">Добавить изменение</el-button>
    </el-form-item>
    <template v-for="(item, i) in anthropometryData">
      <div v-if="item.anthropometryId === param.id" :key="item">
        <el-form-item label="Дата" label-width="12vw">
          <el-date-picker type="date" placeholder="Дата изменения" v-model="anthropometryData[i].date" style="width: 10vw"></el-date-picker>
        </el-form-item>
        <el-form-item label="Значение" label-width="12vw">
          <el-input-number v-model="anthropometryData[i].value"></el-input-number>
        </el-form-item>
        <el-form-item label-width="12vw">
          <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
        </el-form-item>
      </div>
    </template>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import AnthropometryData from '@/classes/anthropometry/AnthropometryData';

@Options({
  props: ['in-anthropometry', 'in-anthropometry-data'],
})
export default class AnthropometryForm extends Vue {
  // Types.
  inAnthropometry!: IAnthropometry[];
  inAnthropometryData!: IAnthropometryData[];
  // Local state.
  anthropometryData = this.inAnthropometryData;

  add(paramId: string): void {
    const data = new AnthropometryData();
    data.anthropometryId = paramId;
    this.anthropometryData.push(data);
  }

  remove(item: any): void {
    const index = this.anthropometryData.indexOf(item);
    if (index !== -1) {
      this.anthropometryData.splice(index, 1);
    }
  }
}
</script>

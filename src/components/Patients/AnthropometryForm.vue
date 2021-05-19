<template>
  <div v-for="param in inAnthropometry" :key="param" class="form-under-collapse">
    <h3 v-html="param.name"></h3>
    <el-button @click="add(param)" style="margin-bottom: 20px">Добавить изменение</el-button>
    <el-row style="font-weight: bold">
      <el-col :span="8"><el-form-item>Дата</el-form-item></el-col>
      <el-col :span="8"><el-form-item>Значение</el-form-item></el-col>
      <el-col :span="8"><el-form-item></el-form-item></el-col>
    </el-row>
    <template v-for="(item, i) in anthropometryData">
      <div v-if="item.anthropometryId === param.id" :key="item">
        <el-row>
          <el-col :span="8">
            <el-form-item>
              <el-date-picker format="DD.MM.YYYY" type="date" placeholder="Дата изменения" v-model="anthropometryData[i].date" style="width: 10vw"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-input-number controls-position="right" v-model="anthropometryData[i].value"> </el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label-width="12vw">
              <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
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

  add(param: IAnthropometry): void {
    const data = new AnthropometryData();
    data.anthropometryId = param.id;
    data.anthropometry = param;
    this.anthropometryData.push(data);
    this.anthropometryData.sort((a: IAnthropometryData, b: IAnthropometryData) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }

  remove(item: any): void {
    const index = this.anthropometryData.indexOf(item);
    if (index !== -1) {
      this.anthropometryData.splice(index, 1);
    }
  }
}
</script>

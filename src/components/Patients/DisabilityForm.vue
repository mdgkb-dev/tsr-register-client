<template>
  <h3>Инвалидность</h3>
  <el-button @click="addDisability()">Добавить изменение</el-button>
  <el-form-item v-for="disability in disabilities" :key="disability">
    <el-form-item label-width="12vw" label="Дата начала инвалидности ">
      <el-date-picker
        type="date"
        placeholder="Выберете дату"
        v-model="disability.period.dateStart"
      ></el-date-picker>
    </el-form-item>

    <el-form-item label-width="12vw" label="Дата окончания инвалидности ">
      <el-date-picker
        type="date"
        placeholder="Выберете дату"
        v-model="disability.period.dateEnd"
      ></el-date-picker>
    </el-form-item>

    <el-button @click="addEdv(disability.edvs)">Добавить справку</el-button>
    <div v-for="(edv, j) in disability.edvs" :key="j">
      <el-form-item label-width="12vw" label="Дата начала действия справки">
        <el-date-picker
          type="date"
          placeholder="Выберете дату"
          v-model="edv.period.dateStart"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="12vw" label="Дата окончания действия справки">
        <el-date-picker
          type="date"
          placeholder="Выберете дату"
          v-model="edv.period.dateEnd"
        ></el-date-picker>
      </el-form-item>
      <el-checkbox v-model="edv.parameter1">Параметр 1</el-checkbox>
      <el-checkbox v-model="edv.parameter2">Параметр 2</el-checkbox>
      <el-checkbox v-model="edv.parameter3">Параметр 3</el-checkbox>
      <el-form-item label-width="12vw">
        <el-button @click.prevent="removeEdv(edvs, edv)">Удалить справку</el-button>
      </el-form-item>
    </div>

    <el-form-item label-width="12vw">
      <el-button @click.prevent="removeDisability(disability.id)">Удалить инвалидность</el-button>
    </el-form-item>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IDisability from '@/interfaces/disabilities/IDisability';
import Disability from '@/classes/disability/Disability';
import Edv from '@/classes/disability/Edv';
import IEdv from '@/interfaces/disabilities/IEdv';

@Options({
  props: ['in-disabilities'],
})
export default class DisabilityForm extends Vue {
  // Types.
  inDisabilities!: IDisability[];

  // Local state.
  disabilities = this.inDisabilities;

  addDisability(): void {
    this.disabilities.push(new Disability());
  }

  addEdv(edvs: IEdv[]): void {
    edvs!.push(new Edv());
  }

  removeDisability(item: IDisability): void {
    const index = this.disabilities.indexOf(item);
    if (index !== -1) {
      this.disabilities.splice(index, 1);
    }
  }

  removeEdv(edvs: IEdv[], edv: IEdv): void {
    const index = edvs.indexOf(edv);
    if (index !== -1) {
      edvs.splice(index, 1);
    }
  }
}
</script>

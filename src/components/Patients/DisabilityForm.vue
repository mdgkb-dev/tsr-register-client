<template>
  <div>
    <el-button @click="addDisability()">Добавить изменение</el-button>
    <el-form-item v-for="disability in disabilities" :key="disability">
      <el-row style="margin-bottom: 40px">
        <el-col :span="8">
          <el-form-item label="Дата начала инвалидности">
            <el-date-picker type="date" placeholder="Выберете дату" v-model="disability.period.dateStart"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Дата окончания инвалидности ">
            <el-date-picker type="date" placeholder="Выберете дату" v-model="disability.period.dateEnd"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button @click.prevent="removeDisability(disability)">Удалить инвалидность</el-button>
          </el-form-item>
        </el-col>
      </el-row>

      <el-button @click="addEdv(disability.edvs)">Добавить справку</el-button>

      <div v-for="(edv, j) in disability.edvs" :key="j" style="margin-top: 20px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="Дата начала действия справки">
              <el-date-picker type="date" placeholder="Выберете дату" v-model="edv.period.dateStart"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="Дата окончания действия справки">
              <el-date-picker type="date" placeholder="Выберете дату" v-model="edv.period.dateEnd"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-checkbox-button v-model="edv.parameter1">A</el-checkbox-button>
            <el-checkbox-button v-model="edv.parameter2">B</el-checkbox-button>
            <el-checkbox-button v-model="edv.parameter3">C</el-checkbox-button>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button @click.prevent="removeEdv(disability.edvs, edv)">Удалить справку</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-divider></el-divider>
    </el-form-item>
  </div>
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

  addEdv = (edvs: IEdv[]): void => {
    if (edvs) {
      edvs.push(new Edv());
    }
  };

  removeDisability(item: IDisability): void {
    const index = this.disabilities.indexOf(item);
    if (index !== -1) {
      this.disabilities.splice(index, 1);
    }
  }

  removeEdv = (edvs: IEdv[], edv: IEdv): void => {
    const index = edvs.indexOf(edv);
    if (index !== -1) {
      edvs.splice(index, 1);
    }
  };
}
</script>
<style>
.but {
  border-radius: 50%;
}
</style>

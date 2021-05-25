<template>
  <el-button @click="addDisability()" style="margin-bottom: 20px">Добавить изменение</el-button>
  <el-row style="font-weight: bold; font-size: 18px">
    <el-col :span="12"><el-form-item>Инвалидность</el-form-item></el-col>
    <el-col :span="12"><el-form-item>Справка ЕДВ</el-form-item></el-col>
  </el-row>
  <el-row style="font-weight: bold">
    <el-col :span="12">
      <el-col :span="12" style="width: 40%"><el-form-item>Начало</el-form-item></el-col>
      <el-col :span="12" style="width: 40%"><el-form-item>Окончание</el-form-item></el-col>
      <!--      <el-col :span="8"><el-form-item></el-form-item></el-col>-->
    </el-col>
    <el-col :span="12">
      <el-col :span="8" style="width: 25%"><el-form-item>Начало</el-form-item></el-col>
      <el-col :span="8" style="width: 25%"><el-form-item>Окончание</el-form-item></el-col>
      <el-col :span="8" style="width: 25%"><el-form-item>Параметры</el-form-item></el-col>
      <el-col :span="8" style="width: 25%"><el-form-item></el-form-item></el-col>
    </el-col>
  </el-row>
  <div v-for="disability in disabilities" :key="disability">
    <el-row>
      <el-col :span="12">
        <el-row style="margin-bottom: 40px">
          <el-col :span="8">
            <el-form-item>
              <el-date-picker format="DD.MM.YYYY" type="date" placeholder="Выберете дату" v-model="disability.period.dateStart"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-date-picker format="DD.MM.YYYY" type="date" placeholder="Выберете дату" v-model="disability.period.dateEnd"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <el-button @click.prevent="removeDisability(disability)">Удалить инвалидность</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-button @click="addEdv(disability.edvs)">Добавить справку</el-button>
        <div v-for="(edv, j) in disability.edvs" :key="j" style="margin-top: 20px">
          <el-row>
            <el-col :span="6">
              <el-form-item>
                <el-date-picker type="date" placeholder="Выберете дату" v-model="edv.period.dateStart"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-date-picker type="date" placeholder="Выберете дату" v-model="edv.period.dateEnd"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-button :type="edv.parameter1 ? 'primary' : undefined" circle v-model="edv.parameter1" @click="edv.parameter1 = !edv.parameter1">A</el-button>
              <el-button :type="edv.parameter2 ? 'primary' : undefined" circle v-model="edv.parameter2" @click="edv.parameter2 = !edv.parameter2">B</el-button>
              <el-button :type="edv.parameter3 ? 'primary' : undefined" circle v-model="edv.parameter3" @click="edv.parameter3 = !edv.parameter3">C</el-button>
            </el-col>
            <el-col :span="3">
              <el-form-item>
                <el-button @click.prevent="removeEdv(disability.edvs, edv)">Удалить справку</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
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

  validateDisabilityDates = (rule: any, value: any, callback: any): void => {
    this.disabilities.forEach((disability: IDisability) => {
      if (disability.period && disability.period.dateStart && disability.period.dateEnd && disability.period.dateStart > disability.period?.dateEnd) {
        callback(new Error('Дата начала инвалидности не может быть больше даты окончания'));
      }
    });
    callback();
  };
}
</script>
<style>
.but {
  border-radius: 50%;
}
</style>

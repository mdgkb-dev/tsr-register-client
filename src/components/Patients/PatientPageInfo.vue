<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <el-avatar shape="square" :size="312" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        </div>
        <h1 class="semi-bold-header">Диагноз</h1>
        <div v-for="item in patient.patientDiagnosis" :key="item.id">
          <span class="underline-label" v-html="item.mkbDiagnosis.code"></span>
          <PopoverInfo :content="item.mkbDiagnosis.name" />
        </div>
        <el-divider></el-divider>

        <h1 class="semi-bold-header">Инвалидность</h1>
        <div v-if="patient.getActuallyDisability()">До {{ $dateFormatRu(patient.getActuallyDisability().period.dateEnd) }}</div>
        <div v-else>Не установлена</div>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Пациент</el-tag>
        <h2 v-html="patient.human.getFullName()" style="margin-bottom: 60px"></h2>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Дата рождения</el-col>
          <el-col :span="12"> {{ $dateFormatRu(patient.human.dateBirth) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Пол</el-col>
          <el-col :span="12"> {{ patient.human.getGender(true) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Языки</el-col>
          <el-col :span="12"> Русский </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Вес - Рост</el-col>
          <el-col :span="12"> {{ getAnthropometryDataFull }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">BMI</el-col>
          <el-col :span="12"> {{ patient.getBmiGroup() }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Адрес</el-col>
          <el-col :span="12"> {{ patient.human.addressRegistration }} </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import PopoverInfo from '@/components/PopoverInfo.vue';
import IAnthropometryData from '@/interfaces/anthropometry/IAnthropometryData';
import IPatient from '../../interfaces/patients/IPatient';

@Options({
  props: ['patient'],
  components: {
    PopoverInfo,
  },
})
export default class PatientPageInfo extends Vue {
  // Types.
  patient!: IPatient;
  checked = true;
  notChecked = false;

  get getAnthropometryDataFull(): string {
    let total = '';
    // const anthropometryNames: (string | undefined)[] = [...new Set(this.anthropometryData.map((data: IAnthropometryData) => data.anthropometry?.name))];
    const anthropometryNames: string[] = ['Вес', 'Рост'];
    anthropometryNames.forEach((name: string) => {
      const currentAnthropometryData = this.patient.anthropometryData.filter((data: IAnthropometryData) => data.anthropometry?.name.toLowerCase() === name.toLowerCase());
      if (currentAnthropometryData.length) {
        const lastAnthropometry = currentAnthropometryData.reduce((mostRecent: IAnthropometryData, item: IAnthropometryData) => (new Date(item.date) > new Date(mostRecent.date) ? item : mostRecent));
        total = `${total} ${lastAnthropometry.getFullInfo()} \n`;
      }
    });
    return total;
  }
}
</script>

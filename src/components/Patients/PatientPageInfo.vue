<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <el-avatar shape="square" :size="312" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        </div>
        <h1 class="semi-bold-header">Диагноз</h1>
        <el-divider></el-divider>

        <h1 class="semi-bold-header">Инвалидность</h1>
        <div v-if="patient.getActuallyDisability()">До {{ patient.getActuallyDisability().period.dateEnd }}</div>
        <div v-else>Не установлена</div>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Пациент</el-tag>
        <h2 v-html="patient.human.getFullName()" style="margin-bottom: 60px"></h2>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Дата рождения</el-col>
          <el-col :span="12"> {{ patient.human.dateBirth }}</el-col>
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
          <el-col :span="12"> {{ patient.getAnthropometryDataFull() }}</el-col>
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

import IPatient from '../../interfaces/patients/IPatient';

@Options({
  props: ['patient'],
})
export default class PatientPageInfo extends Vue {
  // Types.
  patient!: IPatient;
  checked = true;
  notChecked = false;

  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>

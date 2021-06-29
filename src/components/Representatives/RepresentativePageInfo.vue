<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <el-avatar shape="square" :size="312" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        </div>
        <h1 class="semi-bold-header">Контакты</h1>
        <div>{{ representative.human.contact.phone }}</div>
        <div>{{ representative.human.contact.email }}</div>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Зак. представитель</el-tag>
        <h2 v-html="representative.human.getFullName()" style="margin-bottom: 60px"></h2>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Дата рождения</el-col>
          <el-col :span="12"> {{ $dateFormatRu(representative.human.dateBirth) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Пол</el-col>
          <el-col :span="12"> {{ representative.human.getGender(true) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Языки</el-col>
          <el-col :span="12"> Русский, английский </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Адрес</el-col>
          <el-col :span="12"> {{ representative.human.addressRegistration }} </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import IRepresentative from '@/interfaces/representatives/IRepresentative';

@Options({
  name: 'RepresentativePageInfo',
  props: ['representative'],
})
export default class RepresentativePageInfo extends Vue {
  // Types.
  representative!: IRepresentative;

  fillDateFormat = (date: Date) => (date ? Intl.DateTimeFormat('ru-RU').format(new Date(date)) : '');
}
</script>

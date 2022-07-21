<template>
  <div class="table-background" style="width: 100%; margin-bottom: 20px">
    <el-row>
      <el-col :span="8">
        <div class="block">
          <el-avatar shape="square" :size="312" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"></el-avatar>
        </div>
        <el-divider></el-divider>
        <h1 class="semi-bold-header">Контакты</h1>
        <div>{{ human.contact.phone }}</div>
        <div>{{ human.contact.email }}</div>
      </el-col>
      <el-col :span="15" :offset="1">
        <el-tag class="menu-badge">Пользователь</el-tag>
        <h2 style="margin-bottom: 60px">{{ human.getFullName() }}</h2>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Дата рождения</el-col>
          <el-col :span="12"> {{ formatDate(human.dateBirth) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Пол</el-col>
          <el-col :span="12"> {{ human.getGender(true) }}</el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Языки</el-col>
          <el-col :span="12"> Русский </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row>
          <el-col :span="12" style="color: #a1a8bd">Адрес</el-col>
          <el-col :span="12"> {{ human.addressRegistration }} </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IHuman from '@/interfaces/IHuman';

export default defineComponent({
  name: 'PageInfo',
  props: {
    human: {
      type: Object as PropType<IHuman>,
      required: true,
    },
  },
});
</script>

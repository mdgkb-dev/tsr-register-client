<template>
  <el-button style="margin-bottom: 20px" @click="addRadioItem(registerProperty)">Добавить в набор свойства</el-button>
  <div v-for="(registerPropertyRadio, i) in registerProperty.registerPropertyRadios" :key="i">
    <div class="property-row">
      <el-form-item>
        <el-input v-model="registerPropertyRadio.name" placeholder="Please input"></el-input>
      </el-form-item>
      <el-button @click="registerPropertyRadio.addRegisterPropertyOther()">Добавить доп.значение</el-button>
      <el-button @click="registerProperty.removeRadioItem(i)">Удалить поле</el-button>
    </div>
    <div v-for="(registerPropertyOther, i) in registerPropertyRadio.registerPropertyOthers" :key="i">
      <el-input v-model="registerPropertyOther.name" placeholder="Please input"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default defineComponent({
  name: 'RegisterPropertyRadioForm',
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const addRadioItem = (registerProperty: IRegisterProperty) => registerProperty.addRadioItem();

    return {
      addRadioItem,
    };
  },
});
</script>

<style>
.property-row {
  display: flex;
  justify-content: space-between;
}
</style>

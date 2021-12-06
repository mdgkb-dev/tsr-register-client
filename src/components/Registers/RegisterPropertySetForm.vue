<template>
  <el-button style="margin-bottom: 20px" @click="addSetItem(registerProperty)">Добавить в набор свойства</el-button>
  <div v-for="(registerPropertySet, i) in registerProperty.registerPropertySets" :key="i">
    <div class="property-row">
      <el-form-item>
        <el-input v-model="registerPropertySet.name" placeholder="Please input"></el-input>
      </el-form-item>
      <el-button @click.prevent="registerPropertySet.addRegisterPropertyOther()">Добавить доп.значение</el-button>
      <el-button @click.prevent="registerProperty.removeSetItem(i)">Удалить поле</el-button>
    </div>
    <div v-for="(registerPropertyOther, i) in registerPropertySet.registerPropertyOthers" :key="i">
      <el-input v-model="registerPropertyOther.name" placeholder="Please input"></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';

export default defineComponent({
  name: 'RegisterPropertySetForm',
  props: {
    registerProperty: {
      type: Object as PropType<IRegisterProperty>,
      required: true,
    },
  },
  setup(props) {
    const addSetItem = (registerProperty: IRegisterProperty) => registerProperty.addSetItem();

    return {
      addSetItem,
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

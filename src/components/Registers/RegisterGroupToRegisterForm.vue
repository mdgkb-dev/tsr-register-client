<template>
  <!-- <el-button @click="add">Добавить группу</el-button>
  <el-form-item v-for="(item, index) in registerGroupToRegister" :key="index" v-model="registerGroupToRegister">
    <el-select v-model="value">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
  </el-form-item> -->
  <el-select v-model="value" placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IOption from '@/interfaces/shared/IOption';

@Options({
  props: ['in-register-group-to-register', 'in-register-group-options'],
})
export default class RegisterGroupToRegisterForm extends Vue {
  // Types.
  inRegisterGroupToRegister!: IRegisterGroupToRegister[];
  inRegisterGroupOptions!: IOption[];

  // Local state.
  registerGroupToRegister = this.inRegisterGroupToRegister;
  options = [
    {
      value: 'Option1',
      label: 'Option1',
    },
    {
      value: 'Option2',
      label: 'Option2',
    },
    {
      value: 'Option3',
      label: 'Option3',
    },
    {
      value: 'Option4',
      label: 'Option4',
    },
    {
      value: 'Option5',
      label: 'Option5',
    },
  ];
  value = '';

  add(): void {
    this.registerGroupToRegister.push(new RegisterGroupToRegister());
  }
}
</script>

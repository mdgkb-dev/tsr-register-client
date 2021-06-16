<template>
  <el-button @click="add" style="margin-bottom: 10px">Добавить группу</el-button>
  <el-table :data="registerGroupToRegister" style="width: 100%" class="table-shadow">
    <el-table-column type="index" width="50" />
    <el-table-column label="Группа" min-width="250">
      <template #default="scope">
        <el-select v-model="inRegisterGroupToRegister[scope.$index].registerGroupId">
          <el-option v-for="item in inRegisterGroupOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column label="Добавить группу" fixed="right" width="200">
      <template #default="scope">
        <el-button @click.prevent="remove(scope.row)" round>Удалить группу</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';

@Options({
  props: ['in-register-group-to-register', 'in-register-group-options'],
})
export default class RegisterGroupToRegisterForm extends Vue {
  // Types.
  inRegisterGroupToRegister!: IRegisterGroupToRegister[];
  inRegisterGroupOptions!: IRegisterGroup[];

  // Local state.
  registerGroupToRegister = this.inRegisterGroupToRegister;

  add(): void {
    this.registerGroupToRegister.push(new RegisterGroupToRegister());
  }

  remove(item: IRegisterGroup): void {
    const index = this.registerGroupToRegister.indexOf(item);
    if (index !== -1) {
      this.registerGroupToRegister.splice(index, 1);
    }
  }
}
</script>

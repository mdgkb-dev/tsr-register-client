<template>
  <div class="table-under-collapse">
    <el-button @click="add" style="margin-bottom: 10px">Добавить группу</el-button>
    <el-table :data="registerGroupToRegister" style="width: 100%">
      <el-table-column label="Наименование" min-width="250">
        <template #default="scope">
          <el-select v-model="inRegisterGroupToRegister[scope.$index].registerGroupId">
            <el-option v-for="item in inRegisterGroupOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <el-button @click.prevent="remove(scope.row)" type="text" size="small" round>Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

@Options({
  props: ['in-register-group-to-register', 'in-register-group-options'],
})
export default class RegisterGroupForm extends Vue {
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

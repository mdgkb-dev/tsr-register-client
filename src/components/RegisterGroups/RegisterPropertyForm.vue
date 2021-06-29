<template>
  <el-button @click="add" style="margin-bottom: 10px">Добавить свойство</el-button>
  <el-table :data="registerPropertyToRegisterGroup" style="width: 100%" class="table-shadow">
    <el-table-column type="index" width="50" />
    <el-table-column label="Наименование" min-width="250">
      <template #default="scope">
        <el-select v-model="inRegisterPropertyToRegisterGroup[scope.$index].registerPropertyId">
          <el-option v-for="item in inRegisterPropertyOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </template>
    </el-table-column>
    <el-table-column fixed="right" width="200">
      <template #default="scope">
        <el-button @click.prevent="remove(scope.row)" round>Удалить свойство</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import RegisterPropertyToRegisterGroup from '@/classes/registers/RegisterPropertyToRegisterGroup';
import IRegisterProperty from '@/interfaces/registers/IRegisterProperty';
import IRegisterPropertyToRegisterGroup from '@/interfaces/registers/IRegisterPropertyToRegisterGroup';

@Options({
  name: 'RegisterPropertyForm',
  props: ['inRegisterPropertyToRegisterGroup', 'inRegisterPropertyOptions'],
})
export default class RegisterPropertyForm extends Vue {
  // Types.
  inRegisterPropertyToRegisterGroup!: IRegisterPropertyToRegisterGroup[];
  inRegisterPropertyOptions!: IRegisterProperty[];

  // Local state.
  registerPropertyToRegisterGroup = this.inRegisterPropertyToRegisterGroup;

  add(): void {
    this.registerPropertyToRegisterGroup.push(new RegisterPropertyToRegisterGroup());
  }

  remove(item: IRegisterPropertyToRegisterGroup): void {
    const index = this.registerPropertyToRegisterGroup.indexOf(item);
    if (index !== -1) {
      this.registerPropertyToRegisterGroup.splice(index, 1);
    }
  }
}
</script>

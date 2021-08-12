<template>
  <div class="table-under-collapse">
    <el-button style="margin-bottom: 10px" @click="add">Добавить группу</el-button>
    <el-table :data="registerGroupToRegister" style="width: 100%" class="table-shadow" header-row-class-name="header-style">
      <el-table-column type="index" width="60" align="center" />

      <el-table-column label="Наименование" min-width="250">
        <template #default="scope">
          <el-form-item
            label-width="0"
            style="margin-bottom: 0"
            :prop="'registerGroupToRegister.' + scope.$index + '.registerGroupId'"
            :rules="[{ required: true, message: 'Необходимо выбрать группу', trigger: 'change' }]"
          >
            <el-select v-model="inRegisterGroupToRegister[scope.$index].registerGroupId">
              <el-option v-for="item in inRegisterGroupOptions" :key="item.id" :label="item.name" :value="item.id"> </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="Порядковый номер группы" min-width="250">
        <template #default="scope">
          <el-input-number v-model="scope.row.order"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column width="120">
        <template #default="scope">
          <TableButtonGroup :show-remove-button="true" @remove="remove(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

import RegisterGroupToRegister from '@/classes/registers/RegisterGroupToRegister';
import TableButtonGroup from '@/components/TableButtonGroup.vue';
import IRegisterGroup from '@/interfaces/registers/IRegisterGroup';
import IRegisterGroupToRegister from '@/interfaces/registers/IRegisterGroupToRegister';

@Options({
  name: 'RegisterGroupForm',
  props: ['inRegisterGroupToRegister', 'inRegisterGroupOptions'],
  components: {
    TableButtonGroup,
  },
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

  remove(item: IRegisterGroupToRegister): void {
    const index = this.registerGroupToRegister.indexOf(item);
    if (index !== -1) {
      this.registerGroupToRegister.splice(index, 1);
    }
  }
}
</script>

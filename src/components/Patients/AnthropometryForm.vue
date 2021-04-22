<template>
  <h3>Антропометрия</h3>
  <el-form-item v-for="param in anthropometry" :key="param">
    <el-form-item :label="param.name">
      <el-button @click="add(param.id)">Добавить изменение</el-button>
    </el-form-item>
    <template v-for="(item, i) in editPatient.anthropometryData">
      <div v-if="item.anthropometryId === param.id">
        <el-form-item label="Дата" label-width="12vw">
          <el-date-picker
            type="date"
            placeholder="Дата изменения"
            v-model="editPatient.anthropometryData[i].date"
            style="width: 10vw"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="Значение" label-width="12vw">
          <el-input-number v-model="editPatient.anthropometryData[i].value"></el-input-number>
        </el-form-item>
        <el-form-item label-width="12vw">
          <el-button @click.prevent="remove(item)">Удалить изменение</el-button>
        </el-form-item>
      </div>
    </template>
  </el-form-item>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';

import IAnthropometry from '@/interfaces/anthropometry/IAnthropometry';

@Options({
  props: ['human'],
})
export default class AnthropometryForm extends Vue {
  // Types.
  anthropometry!: IAnthropometry[];

  // Local state.
  editAnthropometry = this.anthropometry;
}
</script>
